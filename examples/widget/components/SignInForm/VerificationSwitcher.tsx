import styles from "./VerificationSwitcher.module.css";
import { SignInFormSteps } from "./SignInForm";

type VerificationSteps = SignInFormSteps.CODE | SignInFormSteps.PASSWORD;

type VerificationSwitcherProps = {
  formStep: SignInFormSteps;
  onSwitchVerificationMethod: (step: VerificationSteps) => void;
};

export function VerificationSwitcher({
  formStep,
  onSwitchVerificationMethod,
}: VerificationSwitcherProps): JSX.Element | null {
  const alternateFormStep =
    formStep === SignInFormSteps.CODE
      ? SignInFormSteps.PASSWORD
      : SignInFormSteps.CODE;

  if (formStep === SignInFormSteps.EMAIL) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() => onSwitchVerificationMethod(alternateFormStep)}
        className={styles.switchVerificationMethod}
      >
        Try another method
      </button>
    </div>
  );
}
