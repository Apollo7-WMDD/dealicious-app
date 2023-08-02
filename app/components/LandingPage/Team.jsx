import Link from "next/link";
import styles from "./LandingPage.module.css";

const Team = () => {
  return (
    <section
      className={`${styles["landing--section"]} ${styles["landing--the-team"]}`}
    >
      <h2 className={styles["landing--section-title"]}>The Team</h2>
      <div className={styles["members-container"]}>
        <div className={styles["member"]}>
          <img src="assets/team/edgar.png" alt="" />
          <p className={styles["name"]}>Edgar Velandia</p>
          <p className={styles["title"]}>Full Stack Developer</p>
          <div className={styles["linkedin"]}>
            <i
              className={`${styles["fa-brands"]} ${styles["fa-linkedin"]}`}
            ></i>
            <Link
              href="https://www.linkedin.com/in/edgarvelandia"
              className={styles["linkedin-link"]}
            >
              edgarvelandia
            </Link>
          </div>
        </div>
        <div className={styles["member"]}>
          <img src="assets/team/ziyun.png" alt="" />
          <p className={styles["name"]}>Ziyun Yue</p>
          <p className={styles["title"]}>Full Stack Developer</p>
          <div className={styles["linkedin"]}>
            <i
              className={`${styles["fa-brands"]} ${styles["fa-linkedin"]}`}
            ></i>
            <Link
              href="https://www.linkedin.com/in/ziyunyue"
              className={styles["linkedin-link"]}
            >
              ziyunyue
            </Link>
          </div>
        </div>
        <div className={styles["member"]}>
          <img src="assets/team/mario.png" alt="" />
          <p className={styles["name"]}>Mario Cesena</p>
          <p className={styles["title"]}>Full Stack Developer</p>
          <div className={styles["linkedin"]}>
            <i
              className={`${styles["fa-brands"]} ${styles["fa-linkedin"]}`}
            ></i>
            <Link
              href="https://www.linkedin.com/in/mariocesena"
              className={styles["linkedin-link"]}
            >
              mariocesena
            </Link>
          </div>
        </div>
        <div className={styles["member"]}>
          <img src="assets/team/tony.png" alt="" />
          <p className={styles["name"]}>Tony Saengthamchai</p>
          <p className={styles["title"]}>Full Stack Developer</p>
          <div className={styles["linkedin"]}>
            <i
              className={`${styles["fa-brands"]} ${styles["fa-linkedin"]}`}
            ></i>
            <Link
              href="https://www.linkedin.com/in/tony-sa"
              className={styles["linkedin-link"]}
            >
              tony-sa
            </Link>
          </div>
        </div>
        <div className={styles["member"]}>
          <img src="assets/team/nahla.png" alt="" />
          <p className={styles["name"]}>Nahla Niavarani</p>
          <p className={styles["title"]}>UI/UX Designer</p>
          <div className={styles["linkedin"]}>
            <i
              className={`${styles["fa-brands"]} ${styles["fa-linkedin"]}`}
            ></i>
            <Link
              href="https://www.linkedin.com/in/nahlania"
              className={styles["linkedin-link"]}
            >
              nahlania
            </Link>
          </div>
        </div>
        <div className={styles["member"]}>
          <img src="assets/team/surbhi.png" alt="" />
          <p className={styles["name"]}>Surbhi Kataria</p>
          <p className={styles["title"]}>UI/UX Designer</p>
          <div className={styles["linkedin"]}>
            <i
              className={`${styles["fa-brands"]} ${styles["fa-linkedin"]}`}
            ></i>
            <Link
              href="https://www.linkedin.com/in/surbhikataria"
              className={styles["linkedin-link"]}
            >
              surbhikataria
            </Link>
          </div>
        </div>
        <div className={styles["member"]}>
          <img src="assets/team/pablo.png" alt="" />
          <p className={styles["name"]}>Pablo Montoya Varela</p>
          <p className={styles["title"]}>UI/UX Designer</p>
          <div className={styles["linkedin"]}>
            <i
              className={`${styles["fa-brands"]} ${styles["fa-linkedin"]}`}
            ></i>
            <Link
              href="https://www.linkedin.com/in/palimv"
              className={styles["linkedin-link"]}
            >
              palimv
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
