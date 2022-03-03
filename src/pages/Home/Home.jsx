import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import Card from "../../components/shared/Card/Card";
import styles from "./Home.module.css";

const Home = () => {
	const navigate = useNavigate();
	function startRegister() {
		navigate("/authenticate");
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
					<Button text="Let's Go" onClick={startRegister} />
				</div>
				<div className={styles.signinWrapper}>
					<span className={styles.hasInvite}>Have an invite text?</span>
				</div>
			</Card>
		</div>
	);
};

export default Home;
