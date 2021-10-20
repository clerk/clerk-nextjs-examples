import { useState } from "react";
import { FormLayout } from "../layout/FormLayout";
import { ProfileCompleteStep } from "./ProfileCompleteStep";
import { ProfileUploadPhotoStep } from "./ProfileUploadPhotoStep";

enum FormSteps {
  START,
  PHOTO,
}

export function Profile() {
  const [formStep, setFormStep] = useState(FormSteps.START);
  const gotoNextStep = () => setFormStep((formStep) => formStep + 1);

  return (
    <FormLayout type="create-profile">
      {(() => {
        switch (formStep) {
          case FormSteps.START:
            return <ProfileCompleteStep onDone={gotoNextStep} />;
          case FormSteps.PHOTO:
            return <ProfileUploadPhotoStep />;
        }
      })()}
    </FormLayout>
  );
}
