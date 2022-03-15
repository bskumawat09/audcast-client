import axios from "axios";

axios.defaults.withCredentials = true;
// create axios instance
const api = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
	headers: {
		"Content-type": "application/json",
		Accept: "application/json"
	}
});

export const sendOtp = (data) => api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("/api/verify-otp", data);
export const activate = (data) => api.post("/api/activate", data);
export const logout = () => api.post("/api/logout");
export const getRooms = () => api.get("/api/rooms");
export const createRoom = (data) => api.post("/api/rooms", data);
export const getRoom = (roomId) => api.get(`/api/rooms/${roomId}`);
export const getMyRooms = () => api.get("/api/rooms/my-rooms");
export const deleteRoom = (roomId) => api.delete(`/api/rooms/${roomId}`);

// interceptors
api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (err) => {
		const originalRequest = err.config;
		if (
			err.response?.status === 401 &&
			originalRequest &&
			!originalRequest.isRetry
		) {
			originalRequest.isRetry = true;
			try {
				await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/refresh`);
				return api.request(originalRequest);
			} catch (error) {
				console.log(error.message);
			}
		}
		throw err;
	}
);

export default api;
