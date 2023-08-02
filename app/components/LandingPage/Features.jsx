import styles from "./LandingPage.module.css";
import Link from "next/link";

const Features = () => {
  return (
    <div className={styles["landing--features-container"]}>
      <section
        className={`${styles["landing--section"]} ${styles["landing--features"]}`}
      >
        <h2 className={styles["landing--section-title"]}>Features</h2>
        <div className={styles["features-container"]}>
          <div className={styles["landing--feature"]}>
            <div className={styles["feature-container"]}>
              <img src="assets/features/campaigns.svg" alt="" />
              <h3>Referral Marketing</h3>
            </div>
            <p>
              We empower food businesses to effortlessly create targeted
              marketing campaigns, using a user-friendly interface and an AI
              Generator for personalized offers to attract new and returning
              customers.
            </p>
          </div>
          <div className={styles["landing--feature"]}>
            <div className={styles["feature-container"]}>
              <img src="assets/features/insights.svg" alt="" />
              <h3>Extensive Insights</h3>
            </div>
            <p>
              We offer comprehensive data analysis to business owners, providing
              valuable insights into the performance of their
              marketing&nbsp;campaigns.
            </p>
          </div>
          <div className={styles["landing--feature"]}>
            <div className={styles["feature-container"]}>
              <img src="assets/features/superCostumer.svg" alt="" />
              <h3>Loyalty Programs</h3>
            </div>
            <p>
              We go beyond acquiring new customers. Our platform incorporates a
              robust loyalty program that allows business owners to reward and
              incentivize existing customers.{" "}
            </p>
          </div>
        </div>
        <div className={styles["features-cta"]}>
          <p>
            Whether it’s creating customized campaigns, tracking campaign
            performance, or rewarding Super Customers, <span>Dealicious</span>
            &nbsp;provides a comprehensive solution to drive increased sales and
            sustainable growth.
          </p>
          <Link href="#" className={styles["landing--button"]}>
            Discover
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;
