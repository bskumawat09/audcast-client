import React from "react";
import RoomCard from "../../components/RoomCard/RoomCard";
import styles from "./Rooms.module.css";

// dummy array of rooms data
const rooms = [
	{
		id: 1,
		topic: "Which framework best for frontend ?",
		speakers: [
			{ id: 1, name: "John Doe", avatar: "/images/default-avatar.png" },
			{ id: 2, name: "Raja Kilu", avatar: "/images/default-avatar.png" }
		],
		totalPeople: 5
	},
	{
		id: 2,
		topic: "Which framework best for frontend ?",
		speakers: [
			{ id: 1, name: "John Doe", avatar: "/images/default-avatar.png" },
			{ id: 2, name: "Raja Kilu", avatar: "/images/default-avatar.png" }
		],
		totalPeople: 8
	}
];

const Rooms = () => {
	return (
		<div className="container">
			<div className={styles.roomsHeader}>
				<div className={styles.left}>
					<span className={styles.heading}>All voice rooms</span>
					<div className={styles.searchBox}>
						<img src="/images/search.png" width="24" alt="search" />
						<input type="text" className={styles.searchInput} />
					</div>
				</div>
				<div className={styles.right}>
					<button className={styles.startRoomButton}>
						<img src="/images/voice.png" width="24" alt="voice" />
						<span> Start room</span>
					</button>
				</div>
			</div>
			<div className={styles.roomsList}>
				{rooms.map((room) => (
					<RoomCard key={room.id} room={room} />
				))}
			</div>
		</div>
	);
};

export default Rooms;
