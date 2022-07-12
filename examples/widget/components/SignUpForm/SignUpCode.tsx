import { useSignUp } from "@clerk/nextjs";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { VerifyCodeNotice } from "../common/VerifyCodeNotice";

import { APIResponseError, parseError } from "../utils/errors";
import { Validations } from "../utils/formValidations";

import styles from "./SignUpCode.module.css";

export function SignUpCode({
  emailAddress,
  onDone,
}: {
  emailAddress: string;
  onDone: (sessionId: string) => void;
}) {
  const { isLoaded, signUp } = useSignUp();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{ code: string }>();

  if (!isLoaded) {
    return null;
  }

  const verifySignUpCode: SubmitHandler<{ code: string }> = async function ({
    code,
  }) {
    try {
      setIsLoading(true);
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        onDone(signUpAttempt.createdSessionId!);
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

  const resendSignUpCode = async function () {
    await signUp.prepareEmailAddressVerification();
  };

  return (
    <form onSubmit={handleSubmit(verifySignUpCode)}>
      <VerifyCodeNotice
        onResendClick={resendSignUpCode}
        emailAddress={emailAddress}
      />
      <Input
        label="Code"
        {...register("code", Validations.oneTimeCode)}
        errorText={errors.code?.message}
        autoFocus
      />
      <div className={styles.actionButton}>
        <Button isLoading={isLoading}>Verify</Button>
      </div>
    </form>
  );
}
