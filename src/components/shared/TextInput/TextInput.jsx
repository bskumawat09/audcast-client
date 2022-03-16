import React, { useState } from "react";
import styles from "./TextInput.module.css";

const TextInput = ({ errorMessage, fullwidth, ...restProps }) => {
	const [focused, setFocused] = useState(false);

	return (
		<div>
			<input
				className={styles.input}
				style={{ width: fullwidth === "true" ? "100%" : "inherit" }}
				{...restProps}
				focused={focused.toString()}
				onFocus={(e) => setFocused(true)}
			/>
			{errorMessage && (
				<span className={styles.errorMessage}>{errorMessage}</span>
			)}
		</div>
	);
};

export default TextInput;
