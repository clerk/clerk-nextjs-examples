import styles from "./Terms.module.css";

export function Terms(): JSX.Element {
  return (
    <div className={styles.terms}>
      <span>
        By creating an account, you agree to Widget’s{" "}
        <span>Terms of Service</span> and <span>Privacy Policy</span>
      </span>
    </div>
  );
}
