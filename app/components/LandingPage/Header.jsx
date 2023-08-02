import styles from "./LandingPage.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles["landing--header"]}>
      <img
        src="assets/logoNoD.svg"
        alt=""
        className={styles["landing--logo"]}
      />
      <nav className={styles["landing--nav"]}>
        <ul>
          <li>
            <Link href="#">The Team</Link>
          </li>
          <li>
            <Link href="#">Contact Us</Link>
          </li>
          <li>
            <Link href="#" className={styles["landing--button"]}>
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
