import {useSignIn} from "@clerk/clerk-react";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "../common/Button";
import {Input} from "../common/Input";
import {VerifyCodeNotice} from "../common/VerifyCodeNotice";
import {APIResponseError, parseError} from "../utils/errors";
import {Validations} from "../utils/formValidations";

import styles from "./SignInCode.module.css";

type SignInCodeProps = {
  emailAddress: string;
  onDone: (sessionId: string) => void;
};

export function SignInCode({
  emailAddress,
  onDone,
}: SignInCodeProps) {
  const { isLoaded, signIn } = useSignIn();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{ code: string }>();

  if(!isLoaded) {
    return null;
  }

  const verifySignInCode: SubmitHandler<{ code: string }> = async function ({
    code,
  }) {
    try {
      setIsLoading(true);
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      });
      if (signInAttempt.status === "complete") {
        onDone(signInAttempt.createdSessionId!);
      }
    } catch (err) {
      setError("code", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendSignInCode = async function () {
    const emailCodeFactor = signIn.supportedFirstFactors.find(
      (factor) => factor.strategy === "email_code"
    );

    await signIn.prepareFirstFactor({
      strategy: "email_code",
      // @ts-ignore
      email_address_id: emailCodeFactor.email_address_id,
    });
  };

  return (
    <form onSubmit={handleSubmit(verifySignInCode)}>
      <VerifyCodeNotice
        emailAddress={emailAddress}
        onResendClick={resendSignInCode}
      />
      <Input
        label="Code"
        {...register("code", Validations.oneTimeCode)}
        errorText={errors.code?.message}
        autoFocus
      />
      <div className={styles.actionButton}>
        <Button isLoading={isLoading}>Continue</Button>
      </div>
    </form>
  );
}
