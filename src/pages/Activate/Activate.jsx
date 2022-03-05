import React, { useState } from "react";
import StepName from "../Steps/StepName/StepName";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";

const steps = {
	1: StepName,
	2: StepAvatar
};

const Activate = () => {
	const [stepNumber, setStepNumber] = useState(1);
	const Step = steps[stepNumber];

	function handleNext() {
		setStepNumber(stepNumber + 1);
	}

	return <Step onNext={handleNext} />;
};

export default Activate;
