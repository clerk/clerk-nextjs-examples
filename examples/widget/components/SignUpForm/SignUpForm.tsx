import {useSignUp} from "@clerk/clerk-react";
import {useRouter} from "next/router";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import USA from "../../assets/svg/USA.svg";
import {Button} from "../common/Button";
import {ErrorMessage} from "../common/ErrorMessage";
import {Input} from "../common/Input";
import {Title} from "../common/Title";
import {APIResponseError, parseError} from "../utils/errors";
import {Notice} from "../common/Notice";
import {SignUpCode} from "./SignUpCode";
import styles from "./SignUpForm.module.css";
import {Terms} from "./Terms";
import {Validations} from "../utils/formValidations";

interface SignUpInputs {
  name: string;
  company: string;
  emailAddress: string;
  country: string;
  phone: string;
  password: string;
  clerkError?: string;
}

enum SignUpFormSteps {
  FORM,
  CODE,
}

export function SignUpForm() {
  const {isLoaded, setSession, signUp} = useSignUp();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const [formStep, setFormStep] = React.useState(SignUpFormSteps.FORM);
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm<SignUpInputs>({ defaultValues: { country: "USA" } });

  if(!isLoaded) {
    return null;
  }

  const onSubmit: SubmitHandler<SignUpInputs> = async ({
    emailAddress,
    password,
    name,
    phone,
    country,
    company,
  }) => {
    try {
      setIsLoading(true);
      const [firstName, lastName] = name.split(/\s+/);
      const signUpAttempt = await signUp.create({
        emailAddress,
        password,
        lastName,
        firstName,
        unsafeMetadata: {
          country,
          company,
          phone,
        },
      });
      await signUpAttempt.prepareEmailAddressVerification();
      setFormStep(SignUpFormSteps.CODE);
    } catch (err) {
      setError("clerkError", {
        type: "manual",
        message: parseError(err as APIResponseError),
      });
    } finally {
      setIsLoading(false);
    }
  };

  /** Clerk API related errors on change. */
  watch(() => errors.clerkError && clearErrors("clerkError"));

  const signUpComplete = async (createdSessionId: string) => {
    /** Couldn't the signup be updated and have the createdSessionId ? */
    await setSession(createdSessionId, () => router.push("/dashboard"));
  };

  return (
    <div className={styles.form}>
      <Title
        content={"Sign up"}
        subtitle={
          "Create an account and start integrating widgets in minutes, not days"
        }
      />
      {formStep === SignUpFormSteps.FORM && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Notice
            content="Already have an account?"
            actionLink="/sign-in"
            actionMessage="Sign in instead"
          />
          <div>
            <Input
              {...register("name", Validations.name)}
              label="Full name"
              errorText={errors.name?.message}
            />
            <Input
              label="Company"
              {...register("company", Validations.company)}
              errorText={errors.company?.message}
            />
            <Input
              label="Email"
              type="email"
              {...register("emailAddress", Validations.emailAddress)}
              errorText={errors.emailAddress?.message}
            />
            <Input
              label="Country"
              badge={<USA />}
              {...register("country", Validations.country)}
              errorText={errors.country?.message}
              disabled
            />
            <Input
              label="Phone"
              {...register("phone", Validations.phone)}
              badge={"+1"}
              errorText={errors.phone?.message}
            />
            <Input
              {...register("password", Validations.password)}
              label="Create password"
              type="password"
              errorText={errors.password?.message}
            />
          </div>
          <Terms />
          {errors.clerkError?.message && (
            <div>
              <ErrorMessage message={errors.clerkError.message} />
            </div>
          )}
          <div className={styles.actionButton}>
            <Button isLoading={isLoading}>Create account</Button>
          </div>
        </form>
      )}
      {formStep === SignUpFormSteps.CODE && (
        <SignUpCode
          emailAddress={getValues("emailAddress")}
          onDone={signUpComplete}
        />
      )}
    </div>
  );
}
