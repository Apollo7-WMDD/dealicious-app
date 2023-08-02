import styles from "./LandingPage.module.css";

const ContactUs = () => {
  return (
    <section
      className={`${styles["landing--section"]} ${styles["landing--contact"]}`}
    >
      <h2 className={styles["landing--section-title"]}>Contact Us</h2>

      <div className={styles["landing--ziyun"]}>
        <img
          className={styles["ziyun-arm"]}
          src="assets/ziyun/ziyunArm.svg"
          alt=""
        />
        <img
          className={styles["ziyun-body"]}
          src="assets/ziyun/ziyunBody.svg"
          alt=""
        />
      </div>

      <div className={styles["form-container"]}>
        <form className={styles["landing-form"]} action="">
          <div className={styles["input-container"]}>
            <div className={styles["label-input"]}>
              <label for="fname">Name</label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Your name..."
                required
              />
            </div>

            <div className={styles["label-input"]}>
              <label for="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="lastname"
                placeholder="Your email..."
                required
              />
            </div>
          </div>

          <div className="input-container">
            <div className={styles["label-input"]}>
              <label for="bname">Business Name</label>
              <input
                type="text"
                id="bname"
                name="lastname"
                placeholder="Your business' name..."
              />
            </div>

            <div className={styles["label-input"]}>
              <label for="pnumber">Phone Number</label>
              <input
                type="number"
                id="pnumber"
                name="lastname"
                placeholder="Your phone number..."
              />
            </div>
          </div>

          <div className={styles["label-input"]}>
            <label for="subject">Subject</label>
            <textarea
              id="subject"
              name="subject"
              placeholder="Write something.."
              style="height:200px"
            ></textarea>
          </div>

          <input
            className={styles["landing--button"]}
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
