/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import socketInit from "../socket";
import { ACTIONS } from "../actions";
import freeice from "freeice";

export const useWebRTC = (roomId, user) => {
	const [clients, setClients] = useStateWithCallback([]);

	const audioElements = useRef({});
	const connections = useRef({});
	const localMediaStream = useRef(null);
	const socket = useRef(null);
	const clientsRef = useRef([]);

	const addNewClient = useCallback(
		(newClient, cb) => {
			const alreadyExist = clients.find((client) => client.id === newClient.id);
			if (!alreadyExist) {
				setClients((existingClients) => [...existingClients, newClient], cb);
			}
		},
		[clients, setClients]
	);

	useEffect(() => {
		clientsRef.current = clients;
	}, [clients]);

	useEffect(() => {
		const initChat = async () => {
			socket.current = socketInit();

			const captureMedia = async () => {
				// start capturing local audio stream
				localMediaStream.current = await navigator.mediaDevices.getUserMedia({
					audio: true
				});
			};

			const handleNewPeer = async ({
				peerSocketId,
				createOffer,
				user: remoteUser
			}) => {
				// if peer is already connected
				if (peerSocketId in connections.current) {
					return console.warn(
						`you are already connected with ${peerSocketId} (${user.name})`
					);
				}

				// store it in connections
				connections.current[peerSocketId] = new RTCPeerConnection({
					iceServers: freeice()
				});

				// handle new ice-candidate on this peer connection
				connections.current[peerSocketId].onicecandidate = (event) => {
					socket.current.emit(ACTIONS.RELAY_ICE, {
						peerSocketId,
						icecandidate: event.candidate
					});
				};

				// handle on-track on this connection
				connections.current[peerSocketId].ontrack = ({
					streams: [remoteStream]
				}) => {
					addNewClient({ ...remoteUser, muted: true }, () => {
						if (audioElements.current[remoteUser.id]) {
							audioElements.current[remoteUser.id].srcObject = remoteStream;
						} else {
							let settled = false;
							const interval = setInterval(() => {
								if (audioElements.current[remoteUser.id]) {
									audioElements.current[remoteUser.id].srcObject = remoteStream;
									settled = true;
								}
								if (settled) {
									clearInterval(interval);
								}
							}, 300);
						}
					});
				};

				// add local-track to remote connections
				localMediaStream.current.getTracks().forEach((track) => {
					connections.current[peerSocketId].addTrack(
						track,
						localMediaStream.current
					);
				});

				// create an offer if required
				if (createOffer) {
					const offer = await connections.current[peerSocketId].createOffer();

					// set as local description
					await connections.current[peerSocketId].setLocalDescription(offer);

					// send offer to another client
					socket.current.emit(ACTIONS.RELAY_SDP, {
						peerSocketId,
						sessionDescription: offer
					});
				}
			};

			const setRemoteMedia = async ({
				peerSocketId,
				sessionDescription: remoteSessionDescription
			}) => {
				connections.current[peerSocketId].setRemoteDescription(
					new RTCSessionDescription(remoteSessionDescription)
				);

				// if session description is of type offer then create answer
				if (remoteSessionDescription.type === "offer") {
					const connection = connections.current[peerSocketId];
					const answer = await connection.createAnswer();

					await connection.setLocalDescription(answer);

					socket.current.emit(ACTIONS.RELAY_SDP, {
						peerSocketId,
						sessionDescription: answer
					});
				}
			};

			const handleRemovePeer = async ({ peerSocketId, userId }) => {
				if (connections.current[peerSocketId]) {
					connections.current[peerSocketId].close();
				}

				delete connections.current[peerSocketId];
				delete audioElements.current[peerSocketId];
				setClients((prev) => prev.filter((client) => client.id !== userId));
			};

			const handleIceCandidate = ({ peerSocketId, icecandidate }) => {
				if (icecandidate) {
					connections.current[peerSocketId].addIceCandidate(icecandidate);
				}
			};

			const handleSetMute = (mute, userId) => {
				const clientIndex = clientsRef.current
					.map((client) => client.id)
					.indexOf(userId);

				const connectedClients = JSON.parse(JSON.stringify(clientsRef.current)); // make a copy of object

				if (clientIndex > -1) {
					connectedClients[clientIndex].muted = mute;
					setClients(connectedClients);
				}
			};

			await captureMedia();

			addNewClient({ ...user, muted: true }, () => {
				const localAudioElement = audioElements.current[user.id];
				if (localAudioElement) {
					localAudioElement.volume = 0;
					localAudioElement.srcObject = localMediaStream.current;
				}
			});

			socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);

			socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

			socket.current.on(ACTIONS.ICE_CANDIDATE, handleIceCandidate);

			socket.current.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);

			socket.current.on(ACTIONS.MUTE, ({ userId }) => {
				handleSetMute(true, userId);
			});

			socket.current.on(ACTIONS.UNMUTE, ({ userId }) => {
				handleSetMute(false, userId);
			});

			socket.current.emit(ACTIONS.JOIN, { roomId, user });
		};

		initChat();

		// cleaning functions
		return () => {
			localMediaStream.current.getTracks().forEach((track) => track.stop());
			socket.current.emit(ACTIONS.LEAVE, { roomId });

			for (let peerId in connections.current) {
				connections.current[peerId].close();
				delete connections.current[peerId];
				delete audioElements.current[peerId];
			}

			socket.current.off(ACTIONS.ADD_PEER);
			socket.current.off(ACTIONS.REMOVE_PEER);
			socket.current.off(ACTIONS.ICE_CANDIDATE);
			socket.current.off(ACTIONS.SESSION_DESCRIPTION);
			socket.current.off(ACTIONS.MUTE);
			socket.current.off(ACTIONS.UNMUTE);
		};
	}, []);

	const provideRef = (instance, userId) => {
		audioElements.current[userId] = instance;
	};

	const handleMute = (muted, userId) => {
		let settled = false;
		if (userId === user.id) {
			const interval = setInterval(() => {
				if (localMediaStream.current) {
					localMediaStream.current.getTracks()[0].enabled = !muted;
					if (muted) {
						socket.current.emit(ACTIONS.MUTE, {
							roomId,
							userId
						});
					} else {
						socket.current.emit(ACTIONS.UNMUTE, {
							roomId,
							userId
						});
					}
					settled = true;
				}
				if (settled) {
					clearInterval(interval);
				}
			}, 200);
		}
	};

	return { clients, provideRef, handleMute };
};
