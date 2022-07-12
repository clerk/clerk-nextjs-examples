import formStyles from "../layout/FormLayout.module.css";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { Button } from "../Button";
import { Input } from "../Input";
import { Title } from "../Title";
import { APIResponseError, parseError } from "../../utils/errors";

type SignUpLastNAmeStepProps = {
  onDone: () => void;
};

export function SignUpLastNameStep({ onDone }: SignUpLastNAmeStepProps) {
  const { signUp, isLoaded } = useSignUp();

  const {
    register,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ lastName: string }>({ mode: "all" });

  if (!isLoaded) {
    return null;
  }

  const save = async () => {
    try {
      clearErrors();
      await signUp.update({ lastName: getValues("lastName") });
      onDone();
    } catch (err) {
      setError("lastName", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(save)} className={formStyles.fields}>
      <Title>What’s your last name?</Title>
      <Input
        errorText={errors.lastName?.message}
        {...register("lastName", { required: true, minLength: 2 })}
      />
      <Button
        disabled={
          isSubmitting || !getValues("lastName") || Boolean(errors["lastName"])
        }
      >
        Continue
      </Button>
    </form>
  );
}
