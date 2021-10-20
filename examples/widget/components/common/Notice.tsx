import styles from "./Notice.module.css";
import Link from "next/link";

import Exclamation from "../../assets/svg/Exclamation.svg";

export function Notice({
  content,
  actionLink,
  actionMessage,
}: {
  content: string;
  actionLink: string;
  actionMessage: string;
}): JSX.Element {
  return (
    <div className={styles.notice}>
      <Exclamation />
      <span>{content}</span>
      <Link href={actionLink}>
        <a>{actionMessage}</a>
      </Link>
    </div>
  );
}
