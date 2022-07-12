import styles from "./HomeLayout.module.css";
import Logo from "../assets/svg/logo.svg";
import { UserButton } from "@clerk/nextjs";
import React from "react";

export function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.fullWidth}>
      <header>
        <div className={styles.logoRow}>
          <Logo />
          <UserButton userProfileUrl="/my-profile" afterSignOutUrl="/sign-in" />
        </div>
        <nav className={styles.nav}>
          <button className={styles.navButton}>Home</button>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
