import React, { useState } from "react";
import styles from "./AddRoomModal.module.css";
import TextInput from "../shared/TextInput/TextInput";
import { createRoom as create } from "../../http";
import { useNavigate } from "react-router-dom";

const AddRoomModal = ({ onClose }) => {
	const [roomType, setRoomType] = useState("open");
	const [topic, setTopic] = useState("");
	const navigate = useNavigate();

	async function createRoom() {
		if (!topic) {
			console.log("topic is required");
			return;
		}

		try {
			const { data } = await create({ topic, roomType });
			navigate(`/rooms/${data.room.id}`);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className={styles.modalMask}>
			<div className={styles.modalBody}>
				<button onClick={onClose} className={styles.closeButton}>
					<img src="/images/close.png" alt="close icon" />
				</button>

				<div className={styles.modalHeader}>
					<h3 className={styles.heading}>Enter the topic to be discussed</h3>

					<TextInput
						fullwidth="true"
						value={topic}
						onChange={(e) => setTopic(e.target.value)}
					/>

					<h3 className={styles.subHeading}>Room Types</h3>
					<div className={styles.roomTypes}>
						<div
							onClick={() => setRoomType("open")}
							className={`${styles.typeBox} ${
								roomType === "open" ? styles.active : ""
							}`}>
							<img src="/images/globe.png" alt="globe icon" />
							<span>Open</span>
						</div>
						<div
							onClick={() => setRoomType("social")}
							className={`${styles.typeBox} ${
								roomType === "social" ? styles.active : ""
							}`}>
							<img src="/images/group.png" alt="group icon" />
							<span>Social</span>
						</div>
						<div
							onClick={() => setRoomType("private")}
							className={`${styles.typeBox} ${
								roomType === "private" ? styles.active : ""
							}`}>
							<img src="/images/padlock.png" alt="padlock icon" />
							<span>Private</span>
						</div>
					</div>
				</div>

				<div className={styles.modalFooter}>
					<h3>Start a room, open to everyone</h3>
					<button onClick={createRoom} className={styles.footerButton}>
						<img src="/images/voice.png" alt="voice icon" />
						<span>Let's go</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddRoomModal;
