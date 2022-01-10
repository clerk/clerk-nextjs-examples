import React from "react";
import Logo from "../../assets/svg/Logo.svg";
import ArrowLeft from "../../assets/svg/ArrowLeft.svg";

import styles from "./SignInForm.module.css";
import {Notice} from "../common/Notice";
import {Title} from "../common/Title";
import {Input} from "../common/Input";
import {useSignIn} from "@clerk/nextjs";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {Button} from "../common/Button";
import {APIResponseError, parseError} from "../utils/errors";
import {SignInCode} from "./SignInCode";
import {Validations} from "../utils/formValidations";
import {SignInPassword} from "./SignInPassword";
import {VerificationSwitcher} from "./VerificationSwitcher";
import {EmailCodeFactor} from "@clerk/types";

interface SignInInputs {
  emailAddress: string;
}

export enum SignInFormSteps {
  EMAIL,
  CODE,
  PASSWORD,
}

export function SignInForm() {
  const {isLoaded, signIn, setSession} = useSignIn();
  const router = useRouter();
  const [firstName, setFirstName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const [formStep, setFormStep] = React.useState(SignInFormSteps.EMAIL);
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<SignInInputs>();

  if(!isLoaded) {
    return null;
  }

  const sendSignInCode = async function () {
    const emailAddress = getValues("emailAddress");
    const signInAttempt = await signIn.create({
      identifier: emailAddress,
    });

    const emailCodeFactor = signInAttempt.supportedFirstFactors.find(
      (factor) => factor.strategy === "email_code"
    ) as EmailCodeFactor;

    setFirstName(signInAttempt.userData.firstName || "");
    await signInAttempt.prepareFirstFactor({
      strategy: "email_code",
      emailAddressId: emailCodeFactor.emailAddressId,
    });
  };

  const verifyEmail = async function () {
    try {
      setIsLoading(true);
      await sendSignInCode();
      setFormStep(SignInFormSteps.CODE);
    } catch (err) {
      setError("emailAddress", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUpComplete = async (createdSessionId: string) => {
    /** Couldn't the signin be updated and have the createdSessionId ? */
    setSession(createdSessionId, () => router.push("/dashboard"));
  };

  return (
    <div className={styles.formLayout}>
      {formStep !== SignInFormSteps.EMAIL && (
        <BackButton onClick={() => setFormStep(SignInFormSteps.EMAIL)} />
      )}
      <div>
        <Logo fill={"var(--color-primary)"} />
      </div>
      <Title
        content={"Sign in to your account"}
        subtitle={`Welcome back ${firstName}`}
      />
      {formStep === SignInFormSteps.EMAIL && (
        <form onSubmit={handleSubmit(verifyEmail)}>
          <Input
            label="Email"
            {...register("emailAddress", Validations.emailAddress)}
            errorText={errors.emailAddress?.message}
            autoFocus
          />
          <div className={styles.actionButton}>
            <Button isLoading={isLoading}>Continue</Button>
          </div>
          <Notice
            content="Don’t have an account?"
            actionLink="/sign-up"
            actionMessage="Sign up"
          />
        </form>
      )}
      {formStep === SignInFormSteps.CODE && (
        <SignInCode
          onDone={signUpComplete}
          emailAddress={getValues("emailAddress")}
        />
      )}
      {formStep === SignInFormSteps.PASSWORD && (
        <SignInPassword onDone={signUpComplete} />
      )}
      <VerificationSwitcher
        formStep={formStep}
        onSwitchVerificationMethod={setFormStep}
      />
    </div>
  );
}

type BackButtonProps = { onClick: () => void };
function BackButton({ onClick }: BackButtonProps): JSX.Element {
  return (
    <div>
      <button className={styles.backLink} onClick={onClick}>
        <ArrowLeft /> Back
      </button>
    </div>
  );
}
