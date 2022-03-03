import React, { useState } from "react";
import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from "./StepOtp.module.css";

const StepOtp = ({ onNext }) => {
	const [otp, setOtp] = useState("");
	function next() {}

	return (
		<div className={styles.cardWrapper}>
			<Card title="Enter the OTP sent on your phone" icon="wink-emoji-logo.png">
				<TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
				<div>
					<div className={styles.actionButtonWrapper}>
						<Button onClick={next} text="Next" />
					</div>
					<p className={styles.bottomParagraph}>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
						aliquam fugiat enim molestiae.
					</p>
				</div>
			</Card>
		</div>
	);
};

export default StepOtp;
