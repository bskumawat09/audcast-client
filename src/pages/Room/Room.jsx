import React, { useEffect, useState } from "react";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Room.module.css";
import { getRoom } from "../../http";

const Room = () => {
	const { id: roomId } = useParams();
	const user = useSelector((state) => state.auth.user);
	const { clients, provideRef } = useWebRTC(roomId, user);
	const navigate = useNavigate();
	const [room, setRoom] = useState(null);

	function handleGoBack() {
		navigate("/rooms");
	}

	useEffect(() => {
		const fetchRoom = async () => {
			const { data } = await getRoom(roomId);
			console.log(data);
			setRoom((prev) => data.room);
		};
		fetchRoom();
	}, [roomId]);

	return (
		<div>
			<div className="container">
				<button onClick={handleGoBack} className={styles.goBackButton}>
					<img src="/images/left-arrow.png" alt="left-arrow" />
					<span>All voice rooms</span>
				</button>
			</div>

			<div className={styles.clientsWrapper}>
				<div className={styles.header}>
					<h2 className={styles.topic}>{room?.topic}</h2>

					<div className={styles.actionButtonWrapper}>
						<button className={styles.actionButton}>
							<img src="/images/palm.png" alt="palm-icon" />
						</button>
						<button onClick={handleGoBack} className={styles.actionButton}>
							<img src="/images/win.png" alt="win-icon" />
							<span>Leave quitely</span>
						</button>
					</div>
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
									<button className={styles.micButton}>
										<img src="/images/mic.png" alt="mic-icon" />
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
