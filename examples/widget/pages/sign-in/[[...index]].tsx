import { SignedOut } from "@clerk/clerk-react";
import type { NextPage } from "next";
import { SignInLayout } from "../../layouts/SignInLayout";
import { SignInForm } from "../../components/SignInForm";

const SignIn: NextPage = () => {
  return (
    <SignInLayout>
      <SignedOut>
        <SignInForm />
      </SignedOut>
    </SignInLayout>
  );
};

export default SignIn;
