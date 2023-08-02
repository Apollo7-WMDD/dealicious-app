import styles from "./LandingPage.module.css";

const IntroAnimation = () => {
  return (
    <div className={styles["landing--intro"]}>
      <div className={styles["landing--favicon"]}>
        <img src="assets/favicon.svg" alt="icon landing page" />
      </div>
      <p className={styles["landing--logo-title"]}>dealicious</p>
    </div>
  );
};

export default IntroAnimation;
