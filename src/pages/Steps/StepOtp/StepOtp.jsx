import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import { verifyOtp } from "../../../http";
import { setAuth } from "../../../store/authSlice";
import styles from "./StepOtp.module.css";
import toast from "react-hot-toast";

const StepOtp = ({ onNext }) => {
	const [otp, setOtp] = useState("");
	const dispatch = useDispatch();
	const { phone, hash } = useSelector((state) => state.auth.otp); // get data from auth slice

	async function submit() {
		if (!otp || !phone || !hash) {
			console.log("otp is required");
			toast.error("OTP is required");
			return;
		}

		try {
			const { data } = await toast.promise(verifyOtp({ otp, phone, hash }), {
				loading: "Verifying OTP...",
				success: "OTP varified",
				error: "Invalid OTP"
			});

			console.log(data);

			// const { data } = await verifyOtp({ otp, phone, hash });
			dispatch(setAuth(data));

			// onNext(); no need to call onNext() because our protected routes will handle redirecting to "/activate"
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className="cardWrapper">
			<Card title="Enter the OTP sent on your phone" icon="party-emoji.png">
				<TextInput
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
					placeholder="97979"
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
		</div>
	);
};

export default StepOtp;
