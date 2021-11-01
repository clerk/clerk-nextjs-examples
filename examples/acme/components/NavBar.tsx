import styles from "./NavBar.module.css";
import React from "react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/my-profile/account">
            <a>Account</a>
          </Link>
        </li>
        <li>
          <Link href="/my-profile/security">
            <a>Security</a>
          </Link>
        </li>
        <li>
          <Link href="/my-profile/custom-page">
            <a>Custom page</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
