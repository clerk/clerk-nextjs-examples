import styles from "./Home.module.css";
import NakedLogo from "../assets/svg/naked-logo.svg";
import { UserButton } from "@clerk/clerk-react";

export function Home() {
  return (
    <div className={styles.fullWidth}>
      <header>
        <div className={styles.logoRow}>
          <NakedLogo />
          <UserButton afterSignOutAllUrl="/" />
        </div>
        <nav className={styles.nav}>
          <button className={styles.navButton}>Home</button>
        </nav>
      </header>
      <main className={styles.main}>
        <span className={styles.heading}>Home</span>
        <span className={styles.subHeading}>Welcome to your application</span>
        <div className={styles.grid}>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
        </div>
      </main>
    </div>
  );
}
