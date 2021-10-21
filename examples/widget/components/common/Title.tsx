import styles from "./Title.module.css";

export function Title({
  content,
  subtitle,
}: {
  content: string;
  subtitle: string;
}): JSX.Element {
  return (
    <div className={styles.titleContainer}>
      <p className={styles.title}>{content}</p>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
}
