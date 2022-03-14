import React, { useState } from "react";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";
import styles from "./StepPhoneEmail.module.css";

const phoneEmailMap = {
	phone: Phone,
	email: Email
};

const StepPhoneEmail = ({ onNext }) => {
	const [tab, setTab] = useState("phone");
	const TabComponent = phoneEmailMap[tab];

	return (
		<div className="cardWrapper">
			<div className={styles.wrapper}>
				<div className={styles.buttonWrapper}>
					<button
						className={`${styles.tabButton} ${
							tab === "phone" ? styles.active : ""
						}`}
						onClick={() => setTab("phone")}>
						<img src="/images/smartphone.png" alt="phone" />
					</button>

					<button
						className={`${styles.tabButton} ${
							tab === "email" ? styles.active : ""
						}`}
						onClick={() => setTab("email")}>
						<img src="/images/email.png" alt="email" />
					</button>
				</div>
				<TabComponent onNext={onNext} />
			</div>
		</div>
	);
};

export default StepPhoneEmail;
