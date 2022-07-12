import styles from "./SignInLayout.module.css";

export function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div className={styles.content}>{children}</div>;
}
