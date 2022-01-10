import {UserButton} from "@clerk/nextjs";
import Logo from "../assets/svg/Logo.svg";

import styles from "./Dashboard.module.css";

export function Dashboard() {
  return (
    <div className={styles.fullWidth}>
      <header>
        <div className={styles.logoRow}>
          <Logo />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
        <nav className={styles.nav}>
          <button className={styles.navButton}>Home</button>
        </nav>
      </header>
      <main className={styles.main}>
        <span className={styles.heading}>Home</span>
        <span className={styles.subHeading}>Welcome to your application</span>
        <div className={styles.grid}>
          <div className={styles.box}/>
          <div className={styles.box}/>
          <div className={styles.box}/>
        </div>
      </main>
    </div>
  );
}
