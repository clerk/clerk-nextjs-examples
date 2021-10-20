import formStyles from "../layout/FormLayout.module.css";
import styles from "./Profile.module.css";
import React from "react";
import { Button } from "../Button";
import { Title } from "../Title";
import { useRouter } from "next/router";

type ProfileCompleteStepProps = {
  onDone: () => void;
};

export function ProfileCompleteStep({ onDone }: ProfileCompleteStepProps) {
  const router = useRouter();
  return (
    <div className={formStyles.fields}>
      <Title>Account created</Title>
      <p>Fill out your profile to finish setting up your account.</p>
      <Button type="button" onClick={onDone} onKeyPress={onDone}>
        Continue
      </Button>
      <button
        type="button"
        className={styles.skip}
        onClick={() => router.push("/dashboard")}
        onKeyPress={() => router.push("/dashboard")}
      >
        Skip
      </button>
    </div>
  );
}
