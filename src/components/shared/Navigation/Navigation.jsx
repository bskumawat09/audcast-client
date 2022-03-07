import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../http/index";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import styles from "./Navigation.module.css";

const Navigation = () => {
	// iniline css
	const brandStyle = {
		color: "#fff",
		textDecoration: "none",
		fontWeight: "bold",
		fontSize: "22px",
		display: "flex",
		alignItems: "center"
	};

	const logoEmoji = {
		width: "38px",
		marginRight: "10px"
	};

	const dispatch = useDispatch();
	const { isAuth } = useSelector((state) => state.auth);

	async function logoutUser() {
		try {
			const { data } = await logout();
			dispatch(setAuth(data));
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<nav className={`${styles.navbar} container`}>
			<Link style={brandStyle} to="/">
				<img style={logoEmoji} src="/images/wink-emoji-logo.png" alt="logo" />
				<span>CodersHouse</span>
			</Link>
			{isAuth && <button onClick={logoutUser}>Logout</button>}
		</nav>
	);
};

export default Navigation;
