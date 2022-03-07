import React from "react";
import Card from "../Card/Card";
import styles from "./Loader.module.css";

const Loader = ({ message }) => {
	return (
		<div className="cardWrapper">
			<Card>
				<svg
					className={styles.spinner}
					xmlns="http://www.w3.org/2000/svg"
					width="40"
					height="40"
					viewBox="0 0 50 50"
					fill="#0077fc">
					<path d="M43.935 25.145c0-10.318-8.364-18.683-18.683-18.683-10.318 0-18.683 8.365-18.683 18.683h4.068c0-8.071 6.543-14.615 14.615-14.615s14.615 6.543 14.615 14.615h4.068z" />
				</svg>

				<span className={styles.message}>{message}</span>
			</Card>
		</div>
	);
};

export default Loader;
