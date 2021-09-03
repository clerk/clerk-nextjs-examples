import styles from "./SignUp.module.css";
import LogoIcon from "../assets/svg/logo.svg";
import { Button } from "./Button";
import { Card } from "./layout/Card";
import Link from "next/link";
import { CustomLink } from "./CustomLink";

export function SignUp() {
  return (
    <Card style={{ alignSelf: "center" }}>
      <LogoIcon />
      <Link href="/sign-up-form" passHref>
        <Button style={{ margin: "64px 0px 48px 0px" }}>Sign up</Button>
      </Link>
      <p className={styles.text}>
        Already have an account?{" "}
        <CustomLink href="/sign-in">Sign In</CustomLink>
      </p>
    </Card>
  );
}
