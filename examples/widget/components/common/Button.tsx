import React from "react";
import styles from "./Button.module.css";
import { Spinner } from "./Spinner";

const Button = React.forwardRef<
  HTMLButtonElement,
  {
    children: React.ReactNode;
    isLoading?: boolean;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, isLoading = false, ...rest }, ref) => {
  return (
    <button
      type="submit"
      {...rest}
      className={styles.button}
      ref={ref}
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
