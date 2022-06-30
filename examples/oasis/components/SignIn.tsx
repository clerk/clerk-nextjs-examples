import formStyles from "./layout/FormLayout.module.css";
import { useClerk, useSignIn, withClerk } from "@clerk/nextjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Button } from "./Button";
import { Input } from "./Input";
import { FormLayout } from "./layout/FormLayout";
import { Title } from "./Title";
import { parseError, APIResponseError } from "../utils/errors";

const SIMPLE_REGEX_PATTERN = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

type SignInInputs = {
  email: string;
  code: string;
};

enum FormSteps {
  EMAIL,
  CODE,
}

function SignIn() {
  const router = useRouter();
  const { isLoaded, signIn } = useSignIn();
  const clerk = useClerk();

  const [formStep, setFormStep] = useState(FormSteps.EMAIL);
  const {
    register,
    getValues,
    trigger,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInputs>({ mode: "all" });

  if (!isLoaded) {
    return null;
  }

  const sendOtp = async function () {
    const emailAddress = getValues("email");
    const signInAttempt = await signIn.create({
      identifier: emailAddress,
    });

    const emailCodeFactor = signInAttempt.supportedFirstFactors.find(
      (factor) => factor.strategy === "email_code"
    );

    await signInAttempt.prepareFirstFactor({
      strategy: "email_code",
      // @ts-ignore
      email_address_id: emailCodeFactor.email_address_id,
    });
  };

  const verifyEmail = async function () {
    try {
      clearErrors();
      await sendOtp();
      setFormStep((formStep) => formStep + 1);
    } catch (err) {
      setError("email", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
    }
  };

  const verifyOtp = async function () {
    const otp = getValues("code");
    let signUpAttempt;

    try {
      signUpAttempt = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: otp,
      });
    } catch (err) {
      setError("code", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
    }

    if (signUpAttempt?.status === "complete") {
      clerk.setSession(signUpAttempt.createdSessionId, () =>
        router.push("/dashboard")
      );
    }
  };

  const onSubmit = () => {
    switch (formStep) {
      case FormSteps.EMAIL:
        return verifyEmail();
      case FormSteps.CODE:
        return verifyOtp();
    }
  };

  return (
    <FormLayout type="sign-in">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={formStyles.fields}>
          {formStep === FormSteps.EMAIL && (
            <>
              <Title>Sign in</Title>
              <Input
                errorText={errors.email?.message}
                helperText="Email address"
                {...register("email", {
                  required: true,
                  pattern: SIMPLE_REGEX_PATTERN,
                })}
              />
              <Button
                disabled={
                  isSubmitting || !getValues("email") || Boolean(errors.email)
                }
              >
                Continue
              </Button>
            </>
          )}
          {formStep === FormSteps.CODE && (
            <>
              <Title>Enter the confirmation code</Title>
              <span className={formStyles.sub}>
                A 6-digit code was just sent to {getValues("email")}
              </span>
              <Input
                errorText={errors.code?.message}
                {...register("code", {
                  required: true,
                  maxLength: 6,
                  minLength: 6,
                })}
                onPaste={async () => await trigger("code")}
              />
              <Button disabled={!getValues("code") || Boolean(errors.code)}>
                Continue
              </Button>
            </>
          )}
        </div>
      </form>
    </FormLayout>
  );
}

export const SignInWithClerk = withClerk(SignIn);
