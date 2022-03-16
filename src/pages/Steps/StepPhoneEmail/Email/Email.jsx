import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import { sendOtp } from "../../../../http";
import { setOtp } from "../../../../store/authSlice";
import styles from "../StepPhoneEmail.module.css";

const Email = ({ onNext }) => {
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();

	async function submit() {
		if (!email) {
			console.log("email is required");
			return;
		}

		try {
			const { data } = await sendOtp({ email }); // api request
			dispatch(setOtp({ phone: data.phone, hash: data.hash }));
			onNext();
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Card title="Enter your email" icon="party-emoji.png">
			<TextInput
				type="email"
				placeholder="example@gmail.com"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<div>
				<div className={styles.actionButtonWrapper}>
					<Button onClick={submit} text="Next" />
				</div>
				<p className={styles.bottomParagraph}>
					Dolore officia quos facere at molestiae dolorem. Tempora sed
					reiciendis quos rem magni necessitatibus placeat saepe quasi facere.
				</p>
			</div>
		</Card>
	);
};

export default Email;
