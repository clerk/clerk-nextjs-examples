import { Promotion } from "../components/Promotion";
import styles from "./SignUpLayout.module.css";

export function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <Promotion />
        {children}
      </div>
    </div>
  );
}
