import styles from "./LandingPage.module.css";

const WhyUs = () => {
  return (
    <section id="why-us" className={styles["landing--why-us"]}>
      <div className={styles["why-us-container"]}>
        <img src="assets/favicon.svg" alt="" />

        <div className={styles["why-us-text"]}>
          <h2 className={styles["landing--why-us-tilte"]}>Why Us?</h2>
          <p>
            Dealicious is a web platform that provides an effective solution for
            Food Hospitalities to create referral marketing campaigns and
            loyalty programs, leveraging data analysis and AI tools.{" "}
          </p>

          <p>
            Our goal is to empower these businesses by providing them with a
            comprehensive set of tools to enhance their marketing efforts and
            boost sales. By using Dealicious, Food Hospitalities can
            effortlessly create data-backed and customized referral marketing
            campaigns to attract new customers, while implementing loyalty
            programs to retain their existing customers.{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
