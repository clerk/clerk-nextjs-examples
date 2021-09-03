import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef<
  HTMLInputElement,
  { helperText?: string; errorText?: string }
>(({ helperText, errorText, ...rest }, ref) => {
  return (
    <>
      {errorText && <span className={styles.errorText}>{errorText}</span>}
      {helperText && <span className={styles.helperText}>{helperText}</span>}
      <input className={styles.input} ref={ref} {...rest} />
    </>
  );
});

Input.displayName = "Input";

export { Input };
