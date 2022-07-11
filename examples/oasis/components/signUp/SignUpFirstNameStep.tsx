import formStyles from "../layout/FormLayout.module.css";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { Button } from "../Button";
import { Input } from "../Input";
import { Title } from "../Title";
import { APIResponseError, parseError } from "../../utils/errors";

type SignUpFirstNameStepProps = {
  onDone: () => void;
};

export function SignUpFirstNameStep({ onDone }: SignUpFirstNameStepProps) {
  const { signUp, isLoaded } = useSignUp();

  const {
    register,
    getValues,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<{ firstName: string }>({ mode: "all" });

  if (!isLoaded) {
    return null;
  }

  const save = async () => {
    try {
      clearErrors();
      await signUp.update({ firstName: getValues("firstName") });
      onDone();
    } catch (err) {
      setError("firstName", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(save)} className={formStyles.fields}>
      <Title>What’s your first name?</Title>
      <Input
        errorText={errors.firstName?.message}
        {...register("firstName", { required: true, minLength: 2 })}
      />
      <Button
        disabled={
          isSubmitting ||
          !getValues("firstName") ||
          Boolean(errors["firstName"])
        }
      >
        Continue
      </Button>
    </form>
  );
}
