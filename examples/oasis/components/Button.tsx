import React from "react";
import styles from "./Button.module.css";

const Button = React.forwardRef<
  HTMLButtonElement,
  {
    children: React.ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...rest }, ref) => {
  return (
    <button type="submit" {...rest} className={styles.button} ref={ref}>
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
