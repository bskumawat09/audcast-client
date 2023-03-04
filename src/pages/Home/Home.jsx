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
		<div className="cardWrapper">
			<Card title="Welcome To Audcast !" icon="party-emoji.png">
				<p className={styles.text}>
					Audcast is kind of real-time audio podcast platform, where you can
					join rooms or create your own to get in touch with your peers and can
					easily discuss your topic.
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
