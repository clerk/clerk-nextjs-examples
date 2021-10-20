import React from "react";
import styles from "./VerifyCodeNotice.module.css";

export function VerifyCodeNotice({
  emailAddress,
  onResendClick,
}: {
  emailAddress: string;
  onResendClick: () => void;
}): JSX.Element {
  const [resendCodeDisabled, setResendCodeDisabled] = React.useState(false);

  const handleResendClick = async function () {
    try {
      setResendCodeDisabled(true);
      await onResendClick();
    } finally {
      setResendCodeDisabled(false);
    }
  };

  return (
    <div className={styles.emailNotice}>
      Enter the 6-digit code sent to <br />
      <span className={styles.emailAddress}>{emailAddress}</span>
      <button
        type="button"
        disabled={resendCodeDisabled}
        onClick={handleResendClick}
        className={styles.resendCode}
      >
        Resend code
      </button>
    </div>
  );
}
