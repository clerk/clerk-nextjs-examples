import { useClerk, useUser, SignedOut, SignedIn } from "@clerk/nextjs";
import React from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const thisRepoLink =
  "https://github.com/clerkinc/clerk-nextjs-examples/tree/main/examples/simple";

const allExamplesLink = "https://github.com/clerkinc/clerk-nextjs-examples";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1 className={styles.title}>
          Welcome to <a href="https://clerk.dev">Clerk</a>
        </h1>

        <p className={styles.description}>
          This is a live demo of Clerk&apos;s authentication modals built in{" "}
          <b>Next.js</b>.
          <br />
          <b>Simple</b> and <b>Powerful</b>.
        </p>
        <div className={styles.grid}>
          <SignedOut>
            <SignedOutCards />
          </SignedOut>
          <SignedIn>
            <SignedInCards />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

const SignedOutCards = () => {
  const { openSignIn, openSignUp } = useClerk();
  return (
    <>
      <a onClick={() => openSignIn()} className={styles.card}>
        <h2>Sign in &rarr;</h2>
        <p>Show the sign in modal</p>
      </a>
      <a onClick={() => openSignUp()} className={styles.card}>
        <h2>Sign up &rarr;</h2>
        <p>Show the sign up modal</p>
      </a>
      <a
        href={thisRepoLink}
        className={styles.card}
        target="_blank"
        rel="noreferrer"
      >
        <h2>See the Code &rarr;</h2>
        <p>All this in just a few lines.</p>
      </a>
      <a
        href={allExamplesLink}
        className={styles.card}
        target="_blank"
        rel="noreferrer"
      >
        <h2>More Examples &rarr;</h2>
        <p>See what else you can build.</p>
      </a>
    </>
  );
};

const SignedInCards = () => {
  const { user } = useUser();

  return (
    <>
      <a className={styles.staticCard}>
        <h2>Welcome!</h2>
        <p>Signed in as: {user?.primaryEmailAddress!.toString()}</p>
      </a>
      <Link href="/user">
        <a className={styles.card}>
          <h2>Go to User Profile &rarr;</h2>
          <p>Change your password and more</p>
        </a>
      </Link>
      <a
        href={thisRepoLink}
        className={styles.card}
        target="_blank"
        rel="noreferrer"
      >
        <h2>See the Code &rarr;</h2>
        <p>All this in just a few lines.</p>
      </a>
      <a
        href={allExamplesLink}
        className={styles.card}
        target="_blank"
        rel="noreferrer"
      >
        <h2>More Examples &rarr;</h2>
        <p>See what else you can build.</p>
      </a>
    </>
  );
};

export default Home;
