import Link from "next/link";
import { Button } from "./Button";
import { Card } from "./layout/Card";
import { CustomLink } from "./CustomLink";
import LogoIcon from "../assets/svg/logo.svg";

import styles from "./Home.module.css";

export function Home() {
  return (
    <Card style={{ alignSelf: "center" }}>
      <LogoIcon />
      <Link href="/sign-up" passHref>
        <Button style={{ margin: "64px 0px 48px 0px" }}>Sign up</Button>
      </Link>
      <p className={styles.text}>
        Already have an account?{" "}
        <CustomLink href="/sign-in">Sign In</CustomLink>
      </p>
    </Card>
  );
}
