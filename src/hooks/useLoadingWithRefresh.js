import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
import Cookies from "universal-cookie";

export function useLoadingWithRefresh() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const cookies = new Cookies();

	useEffect(() => {
		// IIFE
		(async () => {
			try {
				const { data } = await axios.get(
					`${process.env.REACT_APP_SERVER_URL}/api/refresh`,
					{ withCredentials: true }
				);
				// store tokens in cookie
				cookies.set("refreshToken", data.tokens.refreshToken, {
					maxAge: 5 * 24 * 60 * 60 * 1000
				});
				cookies.set("accessToken", data.tokens.accessToken, {
					maxAge: 5 * 60 * 1000
				});
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
