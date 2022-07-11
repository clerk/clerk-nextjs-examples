import { useState } from "react";
import { FormLayout } from "../layout/FormLayout";
import { SignUpEmailStep } from "./SignUpEmailStep";
import { SignUpCodeStep } from "./SignUpCodeStep";
import { SignUpFirstNameStep } from "./SignUpFirstNameStep";
import { SignUpLastNameStep } from "./SignUpLastNameStep";
import { SignUpUsernameStep } from "./SignUpUsernameStep";

enum FormSteps {
  EMAIL,
  CODE,
  FIRST_NAME,
  LAST_NAME,
  USERNAME,
}

function SignUp() {
  const [formStep, setFormStep] = useState(FormSteps.EMAIL);
  const gotoNextStep = () => setFormStep((formStep) => formStep + 1);

  return (
    <FormLayout type="sign-up">
      {(() => {
        switch (formStep) {
          case FormSteps.EMAIL:
            return <SignUpEmailStep onDone={gotoNextStep} />;
          case FormSteps.CODE:
            return <SignUpCodeStep onDone={gotoNextStep} />;
          case FormSteps.FIRST_NAME:
            return <SignUpFirstNameStep onDone={gotoNextStep} />;
          case FormSteps.LAST_NAME:
            return <SignUpLastNameStep onDone={gotoNextStep} />;
          case FormSteps.USERNAME:
            return <SignUpUsernameStep />;
        }
      })()}
    </FormLayout>
  );
}

export const SignUpWithClerk = SignUp;
