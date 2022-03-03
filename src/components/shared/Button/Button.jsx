import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, onClick }) => {
	return (
		<button onClick={onClick} className={styles.button}>
			<span>{text}</span>
			<img
				className={styles.arrow}
				src="/images/right-arrows.png"
				alt="arrow"
			/>
		</button>
	);
};

export default Button;
