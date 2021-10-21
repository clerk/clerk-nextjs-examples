import styles from "./Header.module.css";
import type { NextPage } from "next";
import { useClerk, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
// Header component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://docs.clerk.dev/frontend/react/signedin-and-signedout
const Header: NextPage = () => {
  const { openSignIn } = useClerk();

  return (
    <header className={styles.header}>
      <div className={styles.headerItem}>
        <Link href="/">
          <a className={styles.homeButton}>Simple</a>
        </Link>
      </div>
      <SignedIn>
        <div className={styles.headerItem}>
          <UserButton userProfileURL="/user" afterSignOutAll="/" />
        </div>
      </SignedIn>
      <SignedOut>
        <div className={styles.headerItem}>
          <a onClick={() => openSignIn()} className={styles.signInButton}>
            Sign in
          </a>
        </div>
      </SignedOut>
    </header>
  );
};

export default Header;
