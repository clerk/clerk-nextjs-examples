import styles from "./GithubLink.module.css";
import Image from "next/image";

type GithubLinkProps = {
  label: string;
  repoLink: string;
};
const GithubLink = (props: GithubLinkProps) => (
  <>
    <div className={styles.container}>
      <a className={styles.logo} href="https://www.clerk.dev" target="blank">
        <Image src="/clerk.svg" alt="clerk" width="56" height="16" priority />
      </a>
      <div className={styles.label}>{props.label}</div>
      <div className={styles.rightLink}>
        <a href={props.repoLink} target="blank">
          View on Github
          <span className={styles.rightArrow}>
            <Image src="/arrow-right.svg" alt="->" width="12" height="12" />
          </span>
        </a>
      </div>
    </div>
  </>
);

export default GithubLink;
