import clsx from "clsx";
import React from "react";
import { ErrorMessage } from "./ErrorMessage";
import styles from "./Input.module.css";

const Input = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    errorText?: string;
    onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
    autoFocus?: boolean;
    type?: string;
    badge?: React.ReactNode | string;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(
  (
    {
      autoFocus = true,
      type = "text",
      badge,
      label,
      errorText,
      onPaste,
      ...rest
    },
    ref
  ) => {
    return (
      <>
        {label && (
          <label className={styles.label}>
            <div className={styles.inputField}>
              {label}
              <div className={styles.inputContainer}>
                {badge && <div className={styles.badge}>{badge}</div>}
                <input
                  autoFocus={autoFocus}
                  onPaste={onPaste}
                  className={clsx(
                    styles.input,
                    badge && styles.inputWithBadge,
                    errorText && styles.inputWithError
                  )}
                  ref={ref}
                  type={type}
                  {...rest}
                />
              </div>
              {<ErrorMessage message={errorText || ""} />}
            </div>
          </label>
        )}
      </>
    );
  }
);

Input.displayName = "Input";

export { Input };
