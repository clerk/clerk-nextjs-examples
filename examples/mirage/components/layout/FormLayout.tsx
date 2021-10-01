import LogoIcon from "../../assets/svg/logo.svg";
import { CustomLink } from "../CustomLink";
import styles from "./FormLayout.module.css";

type FormType = "sign-up" | "sign-in" | "create-profile";

export function FormLayout({
  children,
  type,
}: {
  children: React.ReactNode;
  type: FormType;
}) {
  return (
    <div className={styles.layout}>
      <div className={styles.logo}>
        <LogoIcon />
      </div>
      {children}
      {type === "sign-in" && <SignUpLink />}
      {type === "sign-up" && <SignInLink />}
    </div>
  );
}

const SignUpLink = () => (
  <p className={styles.text}>
    No account? <CustomLink href="/sign-up">Sign up</CustomLink>
  </p>
);

const SignInLink = () => (
  <p className={styles.text}>
    Already have an account? <CustomLink href="/sign-in">Sign in</CustomLink>
  </p>
);
