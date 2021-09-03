import formStyles from "./layout/FormLayout.module.css";
import styles from "./SignUpForm.module.css";
import UploadIcon from "../assets/svg/upload.svg";
import { useClerk, useSignUp, withClerk } from "@clerk/clerk-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./Button";
import { Input } from "./Input";
import { FormLayout } from "./layout/FormLayout";
import { Title } from "./Title";
import { useRouter } from "next/router";

const SIMPLE_REGEX_PATTERN = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

type SignUpInputs = {
  email: string;
  code: string;
  firstName: string;
  lastName: string;
  username: string;
  photo?: File[];
};

enum FormSteps {
  EMAIL,
  CODE,
  FIRST_NAME,
  LAST_NAME,
  USERNAME,
  PHOTO,
}

type CustomError = {
  type: string;
  message: string;
};

function SignUpForm() {
  const router = useRouter();
  const signUp = useSignUp();
  const clerk = useClerk();

  const [error, setError] = useState<CustomError | null>(null);
  const setClerkError = (error: any, type: string) =>
    // @ts-ignore
    setError({ type, message: error.longMessage });

  const [formStep, setFormStep] = useState(FormSteps.EMAIL);
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<SignUpInputs>({ mode: "all" });
  const [photoSrc, setPhotoSrc] = useState<string>("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { ref: fileUploadRef, onChange: onFileChangeHookForm } =
    register("photo");

  const promptForFile = () => {
    fileRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files ?? [];
    if (files[0]) {
      setPhotoSrc(URL.createObjectURL(files[0]));
    }
  };

  const nextFormStep = function () {
    setError(null);
    setFormStep((formStep) => formStep + 1);
  };

  const emailVerification = async function () {
    try {
      setError(null);
      await sendClerkOtp();
      setFormStep((formStep) => formStep + 1);
    } catch (err) {
      if (err.errors) {
        setClerkError(err.errors[0], "email");
      } else {
        throw err;
      }
    }
  };

  const verifyOtp = async function () {
    const otp = getValues("code");
    const signUpAttempt = await signUp.attemptEmailAddressVerification({
      code: otp,
    });
    if (signUpAttempt.verifications.emailAddress.status === "verified") {
      nextFormStep();
    }
  };

  const sendClerkOtp = async function () {
    const emailAddress = getValues("email");
    const signUpAttempt = await signUp.create({
      emailAddress,
    });
    await signUpAttempt.prepareEmailAddressVerification();
  };

  const completeRegistration = async () => {
    const { username, firstName, lastName } = getValues();
    const signUpAttempt = await signUp.update({
      username,
      firstName,
      lastName,
    });

    if (signUpAttempt.status === "complete") {
      await clerk.setSession(signUpAttempt.createdSessionId);
      const photo = getValues("photo")?.[0];
      if (photo) {
        await clerk.user?.setProfileImage(photo);
      }
      router.replace("/");
    }
  };

  return (
    <FormLayout type="sign-up">
      <form>
        <div className={formStyles.fields}>
          {formStep === FormSteps.EMAIL && (
            <>
              <Title>What’s your email address?</Title>
              <Input
                errorText={error?.message}
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
          {formStep === FormSteps.FIRST_NAME && (
            <>
              <Title>What’s your first name?</Title>
              <Input
                {...register("firstName", { required: true, minLength: 2 })}
              />
              <Button
                onClick={nextFormStep}
                disabled={
                  !getValues("firstName") || Boolean(errors["firstName"])
                }
              >
                Continue
              </Button>
            </>
          )}
          {formStep === FormSteps.LAST_NAME && (
            <>
              <Title>What’s your last name?</Title>
              <Input
                {...register("lastName", { required: true, minLength: 2 })}
              />
              <Button
                onClick={nextFormStep}
                disabled={!getValues("lastName") || Boolean(errors["lastName"])}
              >
                Continue
              </Button>
            </>
          )}
          {formStep === FormSteps.USERNAME && (
            <>
              <Title>Create your username</Title>
              <Input
                {...register("username", { required: true, minLength: 2 })}
              />
              <Button
                onClick={nextFormStep}
                disabled={!getValues("username") || Boolean(errors["username"])}
              >
                Continue
              </Button>
            </>
          )}
          {formStep === FormSteps.PHOTO && (
            <>
              <Title>Upload a photo</Title>
              <input
                onChange={(e) => {
                  onFileChangeHookForm(e);
                  onFileChange(e);
                }}
                name="photo"
                ref={(e) => {
                  fileUploadRef(e);
                  fileRef.current = e;
                }}
                type="file"
                accept="image/jpeg,
              image/png,
              image/gif,
              image/webp"
                className={styles.fileInput}
              />
              {photoSrc ? (
                <img
                  src={photoSrc}
                  className={styles.profileImg}
                  alt="profile"
                />
              ) : (
                <button
                  type="button"
                  onClick={promptForFile}
                  className={styles.fileButton}
                >
                  <UploadIcon />
                </button>
              )}
              <Button
                disabled={!getValues("photo")}
                onClick={async () => await completeRegistration()}
                style={{ marginTop: 24 }}
              >
                Continue
              </Button>
              <button
                type="button"
                className={styles.skipUpload}
                onClick={async () => await completeRegistration()}
              >
                Skip
              </button>
            </>
          )}
        </div>
      </form>
    </FormLayout>
  );
}

export const SignUpFormWithClerk = withClerk(SignUpForm);
