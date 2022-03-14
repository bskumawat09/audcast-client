/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Room.module.css";
import { getRoom } from "../../http";

const Room = () => {
	const { id: roomId } = useParams();
	const user = useSelector((state) => state.auth.user);
	const { clients, provideRef, handleMute } = useWebRTC(roomId, user);
	const navigate = useNavigate();
	const [room, setRoom] = useState(null);
	const [muted, setMuted] = useState(true);

	useEffect(() => {
		handleMute(muted, user.id);
	}, [muted]);

	function handleGoBack() {
		navigate("/rooms");
	}

	useEffect(() => {
		const fetchRoom = async () => {
			const { data } = await getRoom(roomId);
			setRoom((prev) => data.room);
		};
		fetchRoom();
	}, [roomId]);

	const handleMuteClick = (clientId) => {
		if (clientId !== user.id) return;
		setMuted((prev) => !prev);
	};

	return (
		<div>
			<div className="container">
				<button onClick={handleGoBack} className={styles.goBackButton}>
					<img src="/images/left-arrow.png" alt="left arrow icon" />
					<span>All voice rooms</span>
				</button>
			</div>

			<div className={styles.clientsWrapper}>
				<div className={styles.header}>
					<h2 className={styles.topic}>{room?.topic}</h2>

					<button onClick={handleGoBack} className={styles.actionButton}>
						<img src="/images/win.png" alt="win icon" />
						<span>Leave</span>
					</button>
				</div>

				<div className={styles.clientsList}>
					{clients.map((client) => {
						return (
							<div className={styles.client} key={client.id}>
								<div className={styles.userHead}>
									<audio
										ref={(instance) => provideRef(instance, client.id)}
										autoPlay></audio>
									<img
										className={styles.userAvatar}
										src={client.avatar}
										alt="avatar"
									/>
									<button
										onClick={() => handleMuteClick(client.id)}
										className={styles.micButton}>
										{client.muted ? (
											<img src="/images/mic-mute.png" alt="mic mute icon" />
										) : (
											<img src="/images/mic.png" alt="mic icon" />
										)}
									</button>
								</div>
								<h4>{client.name}</h4>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Room;
