import React, { useState } from "react";
import StepOtp from "../Steps/StepOtp/StepOtp";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";

const steps = {
	1: StepPhoneEmail,
	2: StepOtp
};

const Login = () => {
	const [stepNumber, setStepNumber] = useState(1);
	const Step = steps[stepNumber];

	function handleNext() {
		setStepNumber(stepNumber + 1);
	}

	return <Step onNext={handleNext} />;
};

export default Login;
