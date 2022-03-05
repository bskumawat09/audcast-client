import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";
import { sendOtp } from "../../../../http";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";

const Phone = ({ onNext }) => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const dispatch = useDispatch();

	async function submit() {
		// api request
		const { data } = await sendOtp({ phone: phoneNumber });
		console.log(data);
		dispatch(setOtp({ phone: data.phone, hash: data.hash }));
		onNext();
	}

	return (
		<Card title="Enter your phone number" icon="wink-emoji-logo.png">
			<TextInput
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value)}
			/>
			<div>
				<div className={styles.actionButtonWrapper}>
					<Button onClick={submit} text="Next" />
				</div>
				<p className={styles.bottomParagraph}>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
					aliquam fugiat enim molestiae.
				</p>
			</div>
		</Card>
	);
};

export default Phone;
