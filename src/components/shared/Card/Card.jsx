import React from "react";
import styles from "./Card.module.css";

const Card = ({ title, icon, children }) => {
	const logoEmoji = {
		width: "38px",
		marginRight: "10px"
	};

	return (
		<div className={styles.card}>
			<div className={styles.headingWrapper}>
				<img style={logoEmoji} src={`/images/${icon}`} alt="logo" />
				<h1 className={styles.heading}>{title}</h1>
			</div>
			{children}
		</div>
	);
};

export default Card;
