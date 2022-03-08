import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RoomCard.module.css";

const RoomCard = ({ room }) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => {
				navigate(`/rooms/${room.id}`);
			}}
			className={styles.card}>
			<h3 className={styles.topic}>{room.topic}</h3>

			<div
				className={`${styles.speakers} ${
					room.speakers.length === 1 ? styles.singleSpeaker : ""
				}`}>
				<div className={styles.avatars}>
					{room.speakers.map((speaker) => (
						<img key={speaker.id} src={speaker.avatar} alt="speaker-avatar" />
					))}
				</div>

				<div className={styles.names}>
					{room.speakers.map((speaker) => (
						<div key={speaker.id} className={styles.nameWrapper}>
							<span className={styles.name}>{speaker.name}</span>
							<img src="/images/mic.png" width="16" alt="mic-icon" />
						</div>
					))}
				</div>
			</div>

			<div className={styles.peopleCount}>
				<span>{room.totalPeople}</span>
				<img src="/images/user.png" width="16" alt="user-icon" />
			</div>
		</div>
	);
};

export default RoomCard;
