import styles from "./Promotion.module.css";
import Logo from "../assets/svg/Logo.svg";
import Checkmark from "../assets/svg/Checkmark.svg";
import YouTube from "react-youtube";

export function Promotion(): JSX.Element {
  return (
    <div className={styles.promotion}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.video}>
        <YouTube videoId={"c5ZAvQheXO4"} />
      </div>
      <div>
        <ul>
          <li className={styles.benefitsListItem}>
            <Checkmark />
            <div className={styles.benefitsContent}>
              <p className={styles.benefitsTitle}>
                Fastest widget integration in the west
              </p>
              <p className={styles.benefitsSubtitle}>
                And the east, for that matter.
              </p>
            </div>
          </li>
          <li className={styles.benefitsListItem}>
            <Checkmark />
            <div className={styles.benefitsContent}>
              <p className={styles.benefitsTitle}>
                Widgets so good they’ll knock your socks off
              </p>
              <p className={styles.benefitsSubtitle}>
                Hope you like going barefoot!
              </p>
            </div>
          </li>
          <li className={styles.benefitsListItem}>
            <Checkmark />
            <div className={styles.benefitsContent}>
              <p className={styles.benefitsTitle}>
                Widgets on widgets on widgets
              </p>
              <p className={styles.benefitsSubtitle}>
                What are we going to do with all these <br /> widgets??
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
