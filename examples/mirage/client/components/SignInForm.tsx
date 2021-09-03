import formStyles from "./layout/FormLayout.module.css";
import { useClerk, useSignIn } from "@clerk/clerk-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Button } from "./Button";
import { Input } from "./Input";
import { FormLayout } from "./layout/FormLayout";
import { Title } from "./Title";

const SIMPLE_REGEX_PATTERN = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

type SignInInputs = {
  email: string;
  code: string;
};

enum FormSteps {
  EMAIL,
  CODE,
}

function SignInForm() {
  const router = useRouter();
  const signIn = useSignIn();
  const clerk = useClerk();
  const [formStep, setFormStep] = useState(FormSteps.EMAIL);
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<SignInInputs>({ mode: "all" });

  const sendClerkOtp = async function () {
    const emailAddress = getValues("email");
    const signInAttempt = await signIn.create({
      identifier: emailAddress,
    });

    await signInAttempt.prepareFirstFactor({
      strategy: "email_code",
      // @ts-ignore
      email_address_id: signInAttempt.supportedFirstFactors[0].email_address_id,
    });
  };

  const emailVerification = async function () {
    await sendClerkOtp();
    setFormStep((formStep) => formStep + 1);
  };

  const verifyOtp = async function () {
    const otp = getValues("code");
    const signUpAttempt = await signIn.attemptFirstFactor({
      strategy: "email_code",
      code: otp,
    });
    if (signUpAttempt.status === "complete") {
      clerk.setSession(signUpAttempt.createdSessionId, () => router.push("/"));
    }
  };

  return (
    <FormLayout type="sign-in">
      <form>
        <div className={formStyles.fields}>
          {formStep === FormSteps.EMAIL && (
            <>
              <Title>Sign in</Title>
              <Input
                helperText="Email address"
                {...register("email", {
                  required: true,
                  pattern: SIMPLE_REGEX_PATTERN,
                })}
              />
              <Button
                disabled={!getValues("email") || Boolean(errors["email"])}
                onClick={async () => await emailVerification()}
              >
                Continue
              </Button>
            </>
          )}
          {formStep === FormSteps.CODE && (
            <>
              <Title>Enter the confirmation code</Title>
              <span className={formStyles.sub}>
                A 6-digit code was just sent to <br />
                {getValues("email")}
              </span>
              <Input
                {...register("code", {
                  required: true,
                  maxLength: 6,
                  minLength: 6,
                })}
              />
              <Button
                disabled={!getValues("code") || Boolean(errors["code"])}
                onClick={async () => await verifyOtp()}
              >
                Continue
              </Button>
            </>
          )}
        </div>
      </form>
    </FormLayout>
  );
}

export const SignInFormWithClerk = SignInForm;
