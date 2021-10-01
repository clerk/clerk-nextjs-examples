import formStyles from "../layout/FormLayout.module.css";
import { useForm } from "react-hook-form";
import { useClerk, useSignUp } from "@clerk/nextjs";
import { Button } from "../Button";
import { Input } from "../Input";
import { Title } from "../Title";
import { parseError, APIResponseError } from "../../utils/errors";
import type { SignUpResource } from "@clerk/types";
import router from "next/router";

export function SignUpUsernameStep() {
  const clerk = useClerk();
  const signUp = useSignUp();

  const {
    register,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ username: string }>({ mode: "all" });

  const save = async () => {
    try {
      clearErrors();
      const completeSignUp = await signUp.update({
        username: getValues("username"),
      });
      await clerk.setSession(completeSignUp.createdSessionId, () =>
        router.push("/create-profile")
      );
    } catch (err) {
      setError("username", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(save)} className={formStyles.fields}>
      <Title>Create your username</Title>
      <Input
        errorText={errors.username?.message}
        {...register("username", {
          required: true,
          minLength: 4,
          maxLength: 15,
        })}
      />
      <Button
        disabled={
          isSubmitting || !getValues("username") || Boolean(errors["username"])
        }
      >
        Continue
      </Button>
    </form>
  );
}
