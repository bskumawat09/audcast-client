import React, { useEffect, useState } from "react";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
import RoomCard from "../../components/RoomCard/RoomCard";
import Loader from "../../components/shared/Loader/Loader";
import { getRooms } from "../../http";
import styles from "./Rooms.module.css";

const Rooms = () => {
	const [showModal, setShowModal] = useState(false);
	const [rooms, setRooms] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchRooms = async () => {
			setLoading(true);
			try {
				const { data } = await getRooms();
				setRooms(data.rooms);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};
		fetchRooms();
	}, []);

	function openModal() {
		setShowModal(true);
	}

	if (loading) return <Loader message="Fetching rooms data..." />;
	return (
		<div className="container">
			<div className={styles.roomsHeader}>
				<div className={styles.left}>
					<span className={styles.heading}>All voice rooms</span>
					<div className={styles.searchBox}>
						<img src="/images/search.png" alt="search" />
						<input type="text" className={styles.searchInput} />
					</div>
				</div>

				<div className={styles.right}>
					<button onClick={openModal} className={styles.startRoomButton}>
						<img src="/images/voice.png" alt="voice" />
						<span>Start room</span>
					</button>
				</div>
			</div>

			<div className={styles.roomsList}>
				{rooms.map((room) => (
					<RoomCard key={room.id} room={room} setRooms={setRooms} />
				))}
			</div>

			{showModal && <AddRoomModal onClose={() => setShowModal(false)} />}
		</div>
	);
};

export default Rooms;
