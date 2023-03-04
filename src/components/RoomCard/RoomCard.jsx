import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteRoom } from "../../http";
import styles from "./RoomCard.module.css";
import toast from "react-hot-toast";

const RoomCard = ({ room, setRooms }) => {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	async function handleDelete(e) {
		e.stopPropagation(); // stop event bubbling
		try {
			await deleteRoom(room.id);
			toast.success("Deleted room");
			setRooms((prev) => prev.filter((r) => r.id !== room.id));
		} catch (err) {
			console.log(err);
			toast.error("Could not delete");
		}
	}

	async function handleJoinRoom() {
		navigate(`/rooms/${room.id}`);
		toast.success("Joined");
	}

	return (
		<div onClick={handleJoinRoom} className={styles.card}>
			<h3 className={styles.topic}>{room.topic}</h3>

			<div
				className={`${styles.speakers} ${
					room.speakers.length === 1 ? styles.singleSpeaker : ""
				}`}>
				<div className={styles.avatars}>
					{room.speakers.map((speaker) => (
						<img key={speaker._id} src={speaker.avatar} alt="avatar" />
					))}
				</div>

				<div className={styles.names}>
					{room.speakers.map((speaker) => (
						<div key={speaker._id} className={styles.nameWrapper}>
							<span className={styles.name}>{speaker.name}</span>
							<img src="/images/chat.png" alt="chat icon" />
						</div>
					))}
				</div>
			</div>

			<div className={styles.footer}>
				<div className={styles.roomType}>{room.roomType}</div>
				<div className={styles.peopleCount}>
					<span>{room.totalPeoples ? room.totalPeoples : 0}</span>
					<img src="/images/user.png" width="16" alt="user icon" />
				</div>
			</div>

			<button
				onClick={handleDelete}
				className={`${styles.deleteButton} ${
					room.ownerId === user.id ? styles.active : ""
				}`}>
				<img src="/images/delete.png" alt="delete icon" />
			</button>
		</div>
	);
};

export default RoomCard;
