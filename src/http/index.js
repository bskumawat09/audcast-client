import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	withCredentials: true, // to set/send cookie
	headers: {
		"Content-type": "application/json",
		Accept: "application/json"
	}
});

export const sendOtp = (data) => api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("/api/verify-otp", data);
export const activate = (data) => api.post("/api/activate", data);

export default api;
