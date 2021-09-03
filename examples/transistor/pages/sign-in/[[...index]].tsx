import { SignIn } from "@clerk/nextjs";
import { AuthLayout } from "../../client/layouts/AuthLayout";

const SignInPage = () => {
  return (
    <AuthLayout>
      <SignIn signUpURL="/sign-up" />
    </AuthLayout>
  );
};

export default SignInPage;
