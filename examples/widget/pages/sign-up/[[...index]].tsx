import { SignedOut } from "@clerk/clerk-react";
import type { NextPage } from "next";
import { SignUpLayout } from "../../layouts/SignUpLayout";
import { SignUpForm } from "../../components/SignUpForm";

const SignUp: NextPage = () => {
  return (
    <SignUpLayout>
      <SignedOut>
        <SignUpForm />
      </SignedOut>
    </SignUpLayout>
  );
};

export default SignUp;
