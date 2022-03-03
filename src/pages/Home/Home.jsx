import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import Card from "../../components/shared/Card/Card";
import styles from "./Home.module.css";

const Home = () => {
	const signinLinkStyle = {
		color: "#0077ff",
		fontWeight: "bold",
		textDecoration: "none",
		marginLeft: "10px"
	};

	const navigate = useNavigate();
	function startRegister() {
		navigate("/register");
	}

	return (
		<div className={styles.cardWrapper}>
			<Card title="Welcome to CodersHouse!" icon="wink-emoji-logo.png">
				<p className={styles.text}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
					consequatur nisi eos perspiciatis quisquam illum voluptate adipisci
					dicta fugiat. Voluptatibus tenetur accusamus magnam quidem neque
					numquam laborum, alias culpa recusandae.
				</p>
				<div>
					<Button text="Get your username" onClick={startRegister} />
				</div>
				<div className={styles.signinWrapper}>
					<span className={styles.hasInvite}>Have an invite text?</span>
					<Link style={signinLinkStyle} to="/login">
						Sign in
					</Link>
				</div>
			</Card>
		</div>
	);
};

export default Home;
