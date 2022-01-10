import formStyles from "../layout/FormLayout.module.css";
import styles from "./Profile.module.css";
import UploadIcon from "../../assets/svg/upload.svg";
import React, {useRef, useState} from "react";
import {useRouter} from "next/router";
import {useUser} from "@clerk/nextjs";
import {useForm} from "react-hook-form";
import {Button} from "../Button";
import {Title} from "../Title";

export function ProfileUploadPhotoStep() {
  const { user } = useUser();
  const router = useRouter();
  const {register, getValues, handleSubmit} = useForm<{ photo?: File[] }>({
    mode: "all",
  });
  const [photoSrc, setPhotoSrc] = useState<string>("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const {ref: fileUploadRef, onChange: onFileChangeHookForm} =
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

  const onSubmit = async () => {
    const photo = getValues("photo")?.[0];
    if (photo) {
      await user?.setProfileImage({file: photo});
    }

    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formStyles.fields}>
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
        <img src={photoSrc} className={styles.profileImg} alt="profile"/>
      ) : (
        <button
          type="button"
          onKeyPress={promptForFile}
          onClick={promptForFile}
          className={styles.fileButton}
        >
          <UploadIcon/>
        </button>
      )}
      <Button disabled={!getValues("photo")} style={{marginTop: 24}}>
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
    </form>
  );
}
