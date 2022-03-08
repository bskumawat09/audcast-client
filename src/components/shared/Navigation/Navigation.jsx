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

	const brandLogo = {
		width: "36px",
		marginRight: "10px"
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
					<h3>{user?.name}</h3>
					<Link to="/">
						<img
							className={styles.avatar}
							src={user?.avatar}
							width="40"
							height="40"
							alt="avatar"
						/>
					</Link>

					<button className={styles.logoutButton} onClick={logoutUser}>
						<img src="/images/logout-btn.png" width="24" alt="logout" />
					</button>
				</div>
			)}
		</nav>
	);
};

export default Navigation;
