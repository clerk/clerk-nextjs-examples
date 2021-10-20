import clsx from "clsx";
import { CSSTransition } from "react-transition-group";
import styles from "./ErrorMessage.module.css";

export function ErrorMessage({ message }: { message: string }): JSX.Element {
  return (
    <CSSTransition
      in={Boolean(message)}
      timeout={200}
      classNames="errorDisplay"
    >
      <span className={clsx(styles.errorMessage, "errorDisplay")}>
        {message}
      </span>
    </CSSTransition>
  );
}
