import { SignIn } from "@clerk/nextjs";
import { AuthLayout } from "../../layouts/AuthLayout";

const SignInPage = () => {
  return (
    <AuthLayout>
      <SignIn signUpURL="/sign-up" />
    </AuthLayout>
  );
};

export default SignInPage;
