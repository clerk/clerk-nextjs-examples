import styles from "./Title.module.css";

export function Title({ children }: { children: React.ReactNode }) {
  return <span className={styles.title}>{children}</span>;
}
