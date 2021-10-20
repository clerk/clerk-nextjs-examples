import Link from "next/link";
import React from "react";
import styles from "./CustomLink.module.css";

type CustomLinkProps = {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const CustomLink = ({ href, ...linkProps }: CustomLinkProps) => {
  return (
    <Link href={href} passHref>
      <a className={styles.link} {...linkProps} />
    </Link>
  );
};

CustomLink.displayName = "CustomLink";

export { CustomLink };
