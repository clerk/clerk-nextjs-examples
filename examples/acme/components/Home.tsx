import styles from "./Home.module.css";

export function Home() {
  return (
    <>
      <span className={styles.heading}>Home</span>
      <span className={styles.subHeading}>Welcome to your application</span>
      <div className={styles.grid}>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
      </div>
    </>
  );
}
