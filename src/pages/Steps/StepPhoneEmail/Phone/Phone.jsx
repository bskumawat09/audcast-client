import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";
import { sendOtp } from "../../../../http";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";
import toast from "react-hot-toast";

const Phone = ({ onNext }) => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const dispatch = useDispatch();

	const pattern = /^(\+91)[6-9]\d{9}$/;

	async function submit() {
		if (!phoneNumber) {
			console.log("phone number is required");
			toast.error("Phone number is required");
			return;
		}

		// check against regex
		if (!phoneNumber.match(pattern)) {
			console.log("enter valid phone number");
			toast.error("Enter valid phone number");
			return;
		}

		try {
			const { data } = await sendOtp({ phone: phoneNumber }); // api request
			toast.success(`OTP sent on ${phoneNumber}`);
			dispatch(setOtp({ phone: data.phone, hash: data.hash }));
			onNext();
		} catch (err) {
			console.log(err);
			toast.error("Could not send OTP");
		}
	}

	return (
		<Card title="Enter your phone number" icon="party-emoji.png">
			<TextInput
				type="tel"
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value)}
				placeholder="+919876543210"
				required={true}
				pattern="^(\+91)[6-9]\d{9}$"
				errorMessage="Phone number must start with +91 followed by 10 digits"
			/>
			<div>
				<div className={styles.actionButtonWrapper}>
					<Button onClick={submit} text="Next" />
				</div>
				<p className={styles.bottomParagraph}>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
					aliquam fugiat.
				</p>
			</div>
		</Card>
	);
};

export default Phone;
