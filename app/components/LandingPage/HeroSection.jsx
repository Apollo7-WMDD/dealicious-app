import styles from "./LandingPage.module.css";
import Link from "next/link";

const HeroSection = () => {
  return (
    <main className={styles["landing--hero"]}>
      <div className={styles["landing--skyline-container"]}>
        <img id="sky" src="assets/skyline/sky2.svg" alt="" />
        <img
          id="mountains"
          className={styles["landing--mountains"]}
          src="assets/skyline/mountains2.svg"
          alt=""
        />
        <img id="skyline1" src="assets/skyline/skyline1-2.svg" alt="" />
        <img id="skyline2" src="assets/skyline/skyline2-2.svg" alt="" />
        <img id="floor" src="assets/skyline/floor2.svg" alt="" />
        <img
          id="landingRestaurant"
          className={styles["landing--restaurant"]}
          src="assets/skyline/restaurant2.svg"
          alt=""
        />
        <img
          id="landingBench"
          className={styles["landing--bench"]}
          src="assets/skyline/bench2.svg"
          alt=""
        />
      </div>

      <div className={styles["landing--main-cta"]}>
        <div className={styles["cta-container"]}>
          <img
            src="assets/logoNoD.svg"
            className={styles["landing--main-logo"]}
          />
          <h1 className={styles["landing--main-title"]}>Taste of Growth!</h1>
        </div>

        <Link
          href="#why-us"
          className={`${styles["landing--button"]} ${styles["landing--main-button"]}`}
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
};

export default HeroSection;
