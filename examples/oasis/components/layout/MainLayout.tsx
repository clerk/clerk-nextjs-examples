import styles from "./MainLayout.module.css";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.layout}>{children}</div>;
}
