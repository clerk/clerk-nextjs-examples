import {SignedOut} from "@clerk/nextjs";
import type {NextPage} from "next";
import {SignUpLayout} from "../../layouts/SignUpLayout";
import {SignUpForm} from "../../components/SignUpForm";

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
