import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import { activate } from "../../../http";
import { setAvatar } from "../../../store/activateSlice";
import { setAuth } from "../../../store/authSlice";
import Loader from "../../../components/shared/Loader/Loader";
import styles from "./StepAvatar.module.css";

const StepAvatar = ({ onNext }) => {
	const [image, setImage] = useState("/images/default-avatar.png");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const { name, avatar } = useSelector((state) => state.activate);

	function captureImage(e) {
		const file = e.target.files[0];
		// convert 'file' to base64 string
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = function () {
			console.log(reader.result);
			setImage(reader.result);
			dispatch(setAvatar(reader.result));
		};
	}

	async function submit() {
		if (!name || !avatar) return;

		setLoading(true);
		try {
			const { data } = await activate({ name, avatar });
			console.log(data);
			dispatch(setAuth(data));
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	}

	if (loading) return <Loader message="Activation in progress" />;
	return (
		<div className="cardWrapper">
			<Card title={`Hello, ${name}`} icon="wink-emoji-logo.png">
				<p className={styles.subHeading}>How's is this photo?</p>
				<div className={styles.avatarWrapper}>
					<img className={styles.avatar} src={image} alt="avatar" />
				</div>
				<div>
					<input
						onChange={captureImage}
						id="avatarInput"
						className={styles.avatarInput}
						type="file"
					/>
					<label htmlFor="avatarInput" className={styles.avatarLebel}>
						Choose different photo
					</label>
				</div>
				<div className={styles.actionButtonWrapper}>
					<Button onClick={submit} text="Next" />
				</div>
			</Card>
		</div>
	);
};

export default StepAvatar;
