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

	useEffect(() => {
		socket.current = socketInit();
	}, []);

	const addNewClient = useCallback(
		(newClient, cb) => {
			const alreadyExist = clients.find((client) => client.id === newClient.id);
			if (!alreadyExist) {
				setClients((existingClients) => [...existingClients, newClient], cb);
			}
		},
		[clients, setClients]
	);

	// capture media
	useEffect(() => {
		const startCapture = async () => {
			localMediaStream.current = await navigator.mediaDevices.getUserMedia({
				audio: true
			});
		};

		startCapture().then(() => {
			addNewClient(user, () => {
				const localAudioElement = audioElements.current[user.id];
				if (localAudioElement) {
					localAudioElement.volume = 0;
					localAudioElement.srcObject = localMediaStream.current;
				}

				// socket emit JOIN using socket.io
				socket.current.emit(ACTIONS.JOIN, { roomId, user });
			});
		});

		// cleaning function
		return () => {
			// leaving the room
			localMediaStream.current.getTracks().forEach((track) => track.stop());
			socket.current.emit(ACTIONS.LEAVE, { roomId });
		};
	}, []);

	useEffect(() => {
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
				addNewClient(remoteUser, () => {
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
						}, 500);
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

		socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);

		// cleaning function
		return () => {
			socket.current.off(ACTIONS.ADD_PEER);
		};
	}, []);

	// handle relay-ice
	useEffect(() => {
		socket.current.on(
			ACTIONS.ICE_CANDIDATE,
			({ peerSocketId, icecandidate }) => {
				if (icecandidate) {
					connections.current[peerSocketId].addIceCandidate(icecandidate);
				}
			}
		);

		// cleaning function
		return () => {
			socket.current.off(ACTIONS.ICE_CANDIDATE);
		};
	}, []);

	// handle relay-sdp
	useEffect(() => {
		const handleRemoteSdp = async ({
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

		socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSdp);

		return () => {
			socket.current.off(ACTIONS.SESSION_DESCRIPTION);
		};
	}, []);

	// handle remove peer
	useEffect(() => {
		const handleRemovePeer = async ({ peerSocketId, userId }) => {
			if (connections.current[peerSocketId]) {
				connections.current[peerSocketId].close();
			}

			delete connections.current[peerSocketId];
			delete audioElements.current[peerSocketId];
			setClients((prev) => prev.filter((client) => client.id !== userId));
		};

		socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

		return () => {
			socket.current.off(ACTIONS.REMOVE_PEER);
		};
	}, []);

	const provideRef = (instance, userId) => {
		audioElements.current[userId] = instance;
	};

	return { clients, provideRef };
};
