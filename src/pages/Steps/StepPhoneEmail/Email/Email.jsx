import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import { sendOtp } from "../../../../http";
import { setOtp } from "../../../../store/authSlice";
import styles from "../StepPhoneEmail.module.css";
import toast from "react-hot-toast";

const Email = ({ onNext }) => {
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();

	async function submit() {
		if (!email) {
			console.log("email is required");
			toast.error("Email is required");
			return;
		}

		try {
			const { data } = await sendOtp({ email }); // api request
			toast.success(`OTP sent on ${email}`);
			dispatch(setOtp({ email: data.email, hash: data.hash }));
			onNext();
		} catch (err) {
			console.log(err);
			toast.error("Could not send OTP");
		}
	}

	return (
		<Card title="Enter your email" icon="party-emoji.png">
			<TextInput
				type="email"
				placeholder="example@gmail.com"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required={true}
				errorMessage="Enter valid email address"
			/>
			<div>
				<div className={styles.actionButtonWrapper}>
					<Button onClick={submit} text="Next" />
				</div>
				<p className={styles.bottomParagraph}>
					Dolore officia quos facere at molestiae dolorem. Tempora sed magni
					placeat saepe quasi facere.
				</p>
			</div>
		</Card>
	);
};

export default Email;
