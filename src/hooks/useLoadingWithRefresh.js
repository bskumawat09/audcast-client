import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";

export function useLoadingWithRefresh() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		// IIFE
		(async () => {
			try {
				const { data } = await axios.get(
					`${process.env.REACT_APP_BASE_URL}/api/refresh`,
					{ withCredentials: true }
				);
				dispatch(setAuth(data));
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		})();
	});

	return { loading };
}
