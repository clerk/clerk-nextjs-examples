import formStyles from "../layout/FormLayout.module.css";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { Button } from "../Button";
import { Input } from "../Input";
import { Title } from "../Title";
import { parseError, APIResponseError } from "../../utils/errors";
import React from "react";

const SIMPLE_REGEX_PATTERN = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

type SignUpEmailStepProps = {
  onDone: () => void;
};

export function SignUpEmailStep({ onDone }: SignUpEmailStepProps) {
  const { signUp, isLoaded } = useSignUp();

  const {
    register,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>({ mode: "all" });

  if (!isLoaded) {
    return null;
  }

  const sendClerkOtp = async function () {
    const emailAddress = getValues("email");
    const signUpAttempt = await signUp.create({
      emailAddress,
    });
    await signUpAttempt.prepareEmailAddressVerification({
      strategy: "email_code",
    });
  };

  const verifyEmail = async function () {
    try {
      clearErrors();
      await sendClerkOtp();
      onDone();
    } catch (err) {
      setError("email", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(verifyEmail)} className={formStyles.fields}>
      <Title>What’s your email address?</Title>
      <Input
        errorText={errors.email?.message}
        {...register("email", {
          required: true,
          pattern: SIMPLE_REGEX_PATTERN,
        })}
      />
      <Button
        disabled={isSubmitting || !getValues("email") || Boolean(errors.email)}
      >
        Continue
      </Button>
    </form>
  );
}
