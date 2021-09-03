import { SignUp } from "@clerk/nextjs";
import { AuthLayout } from "../../client/layouts/AuthLayout";

const SignUpPage = () => {
  return (
    <AuthLayout>
      <SignUp signInUrl="/sign-in" />
    </AuthLayout>
  );
};

export default SignUpPage;
