import React, { useState } from "react";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../Steps/StepOtp/StepOtp";
import StepName from "../Steps/StepName/StepName";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";
import StepUsername from "../Steps/StepUsername/StepUsername";

const steps = {
	1: StepPhoneEmail,
	2: StepOtp,
	3: StepName,
	4: StepAvatar,
	5: StepUsername
};

const Register = () => {
	const [stepNumber, setStepNumber] = useState(1);
	const Step = steps[stepNumber];

	function handleNext() {
		setStepNumber(stepNumber + 1);
	}

	return (
		<div>
			<Step onNext={handleNext} />
		</div>
	);
};

export default Register;
