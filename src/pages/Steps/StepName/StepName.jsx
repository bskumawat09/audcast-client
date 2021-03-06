import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from "./StepName.module.css";
import { setName } from "../../../store/activateSlice";
import toast from "react-hot-toast";

const StepName = ({ onNext }) => {
	const { name } = useSelector((state) => state.activate); // get name from activate slice
	const [fullName, setFullName] = useState(name);
	const dispatch = useDispatch();

	function nextStep() {
		if (!fullName) {
			console.log("full name required");
			toast.error("Name is required");
			return;
		}
		dispatch(setName(fullName));
		onNext();
	}

	return (
		<div className="cardWrapper">
			<Card title="Enter your full name" icon="party-emoji.png">
				<TextInput
					type="text"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
				/>
				<div>
					<p className={styles.paragraph}>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
						aliquam.
					</p>
					<div className={styles.actionButtonWrapper}>
						<Button onClick={nextStep} text="Next" />
					</div>
				</div>
			</Card>
		</div>
	);
};

export default StepName;
