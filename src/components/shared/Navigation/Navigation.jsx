import React from "react";
import { Link } from "react-router-dom";
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

	return (
		<nav className={`${styles.navbar} container`}>
			<Link style={brandStyle} to="/">
				<img style={logoEmoji} src="/images/wink-emoji-logo.png" alt="logo" />
				<span>CodersHouse</span>
			</Link>
		</nav>
	);
};

export default Navigation;
