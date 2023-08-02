import styles from "./LandingPage.module.css";

const Footer = () => {
  return (
    <footer className={styles["landing--footer"]}>
      <div className={styles["logo-container"]}>
        <img
          className={styles["landing--logo"]}
          src="assets/logoNoD.svg"
          alt=""
        />
        <p>
          &copy; Team <b>Apollo7.</b> All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
