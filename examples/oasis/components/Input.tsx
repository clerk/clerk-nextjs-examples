import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef<
  HTMLInputElement,
  {
    helperText?: string;
    errorText?: string;
    onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
    autoFocus?: boolean;
  }
>(({ autoFocus = true, helperText, errorText, onPaste, ...rest }, ref) => {
  return (
    <>
      {helperText && <span className={styles.helperText}>{helperText}</span>}
      <input
        autoFocus={autoFocus}
        onPaste={onPaste}
        className={styles.input}
        ref={ref}
        {...rest}
      />
      {errorText && <span className={styles.errorText}>{errorText}</span>}
    </>
  );
});

Input.displayName = "Input";

export { Input };
