import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import { verifyOtp } from "../../../http";
import { setAuth } from "../../../store/authSlice";
import styles from "./StepOtp.module.css";

const StepOtp = ({ onNext }) => {
	const [otp, setOtp] = useState("");
	const dispatch = useDispatch();
	// get data from auth slice
	const { phone, hash } = useSelector((state) => state.auth.otp);

	async function submit() {
		try {
			const { data } = await verifyOtp({ otp, phone, hash });
			console.log(data);
			dispatch(setAuth(data));
			// onNext(); no need to call onNext() because protected route will handle redirecting to /activate route
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className="cardWrapper">
			<Card title="Enter the OTP sent on your phone" icon="wink-emoji-logo.png">
				<TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
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
		</div>
	);
};

export default StepOtp;
