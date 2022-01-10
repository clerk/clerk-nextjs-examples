import { SignIn } from "@clerk/nextjs";
import { AuthLayout } from "../../layouts/AuthLayout";

const SignInPage = () => {
  return (
    <AuthLayout>
      <SignIn signUpUrl="/sign-up" />
    </AuthLayout>
  );
};

export default SignInPage;
