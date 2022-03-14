import { io } from "socket.io-client";

const socketInit = () => {
	const options = {
		withCredentials: true,
		"force new connection": true,
		reconnectionAttempt: "Infinity",
		timeout: 10000,
		transports: ["websocket"]
	};

	return io("https://audcast.herokuapp.com", options);
};

export default socketInit;
