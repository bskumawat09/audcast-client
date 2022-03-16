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
		fontSize: "1.25rem",
		display: "flex",
		alignItems: "center"
	};

	const brandLogo = {
		width: "2rem",
		marginRight: "0.625em"
	};

	const dispatch = useDispatch();
	const { isAuth, user } = useSelector((state) => state.auth);

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
				<img style={brandLogo} src="/images/audcast-logo.png" alt="logo" />
				<span className={styles.brandText}>AUDCAST</span>
			</Link>
			{isAuth && (
				<div className={styles.navRight}>
					<h4>{user?.name}</h4>
					<Link to="/">
						<img
							className={styles.avatar}
							src={user.avatar ? user.avatar : "/images/monkey-avatar.png"}
							alt="avatar"
						/>
					</Link>

					<button className={styles.logoutButton} onClick={logoutUser}>
						<img src="/images/logout-btn.png" alt="logout" />
					</button>
				</div>
			)}
		</nav>
	);
};

export default Navigation;
