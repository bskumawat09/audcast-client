import React, { useState } from "react";
import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";

const Email = ({ onNext }) => {
	const [email, setEmail] = useState("");

	return (
		<Card title="Enter your email" icon="wink-emoji-logo.png">
			<TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
			<div>
				<div className={styles.actionButtonWrapper}>
					<Button onClick={onNext} text="Next" />
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
