import formStyles from "../layout/FormLayout.module.css";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { Button } from "../Button";
import { Input } from "../Input";
import { Title } from "../Title";
import { APIResponseError, parseError } from "../../utils/errors";
import router from "next/router";

export function SignUpUsernameStep() {
  const { signUp, isLoaded, setSession } = useSignUp();

  const {
    register,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ username: string }>({ mode: "all" });

  if (!isLoaded) {
    return null;
  }

  const save = async () => {
    try {
      clearErrors();
      const completeSignUp = await signUp.update({
        username: getValues("username"),
      });
      if (completeSignUp.status === "complete") {
        await setSession(completeSignUp.createdSessionId, () => {
          return router.push("/create-profile");
        });
      }
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
