import {useSignIn} from "@clerk/nextjs";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "../common/Button";
import {Input} from "../common/Input";
import {APIResponseError, parseError} from "../utils/errors";
import {Validations} from "../utils/formValidations";

import styles from "./SignInPassword.module.css";

type SignInPasswordProps = {
  onDone: (sessionId: string) => void;
};

export function SignInPassword({ onDone }: SignInPasswordProps) {
  const {isLoaded, signIn} = useSignIn();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{ password: string }>();

  if(!isLoaded) {
    return null;
  }

  const verifyPassword: SubmitHandler<{ password: string }> = async function ({
    password,
  }) {
    try {
      setIsLoading(true);
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: "password",
        password,
      });
      if (signInAttempt.status === "complete") {
        onDone(signInAttempt.createdSessionId!);
      }
    } catch (err) {
      setError("password", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(verifyPassword)}>
      <Input
        label="Password"
        type="password"
        {...register("password", Validations.password)}
        errorText={errors.password?.message}
      />
      <div className={styles.actionButton}>
        <Button isLoading={isLoading}>Continue</Button>
      </div>
    </form>
  );
}
