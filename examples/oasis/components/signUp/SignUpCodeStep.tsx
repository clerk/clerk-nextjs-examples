import formStyles from "../layout/FormLayout.module.css";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { Input } from "../Input";
import { Title } from "../Title";
import { parseError, APIResponseError } from "../../utils/errors";

type SignUpCodeStepProps = {
  onDone: () => void;
};

export function SignUpCodeStep({ onDone }: SignUpCodeStepProps) {
  const { signUp, isLoaded } = useSignUp();

  const {
    register,
    getValues,
    trigger,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ code: string }>({ mode: "all" });

  if (!isLoaded) {
    return null;
  }

  const verifyOtp = async function () {
    const otp = getValues("code");
    try {
      clearErrors();
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: otp,
      });
      if (signUpAttempt.verifications.emailAddress.status === "verified") {
        onDone();
      }
    } catch (err) {
      setError("code", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(verifyOtp)} className={formStyles.fields}>
      <Title>Enter the confirmation code</Title>
      <span className={formStyles.sub}>
        A 6-digit code was just sent to {signUp.emailAddress}
        <br />
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
      <Button
        disabled={isSubmitting || !getValues("code") || Boolean(errors.code)}
      >
        Continue
      </Button>
    </form>
  );
}
