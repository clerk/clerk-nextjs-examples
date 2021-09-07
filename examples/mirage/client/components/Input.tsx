import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef<
  HTMLInputElement,
  {
    helperText?: string;
    errorText?: string;
    onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
  }
>(({ helperText, errorText, onPaste, ...rest }, ref) => {
  return (
    <>
      {errorText && <span className={styles.errorText}>{errorText}</span>}
      {helperText && <span className={styles.helperText}>{helperText}</span>}
      <input onPaste={onPaste} className={styles.input} ref={ref} {...rest} />
    </>
  );
});

Input.displayName = "Input";

export { Input };
