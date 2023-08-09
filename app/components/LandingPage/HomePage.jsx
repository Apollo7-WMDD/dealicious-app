"use client";

import styles from "./LandingPage.module.css";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";

// // import next-auth hooks
import { useSession, signOut } from "next-auth/react";
import { useStore } from "@/lib/context/user_context/store";

// import material ui
import { Modal, Box, Typography, Button, useTheme } from "@mui/material";


// Contact us email
import emailjs from "@emailjs/browser";
import CloseIcon from "@mui/icons-material/Close";

// loader
import LoaderSession from "./LoaderSession";

const HomePage = () => {
  const { data: session, status } = useSession();
  const { setRestaurantOwner, restaurantOwnerId } = useStore();
  const theme = useTheme();

  const logoRef = useRef(null);
  const favicon = useRef(null);
  const landingIntro = useRef(null);
  const skyline1 = useRef(null);
  const skyline2 = useRef(null);
  const landingSkylineContainer = useRef(null);
  const landingRestaurant = useRef(null);
  const landingBench = useRef(null);
  const landingHeader = useRef(null);
  const landingMainCta = useRef(null);
  const sky = useRef(null);
  const mountains = useRef(null);
  const floor = useRef(null);
  const scrolCta = useRef(null);
  const landingHeaderMobile = useRef(null);

  // mobile nav refs
  const menu = useRef(null);
  const cross = useRef(null);
  const mobileNav = useRef(null);

  useEffect(() => {
    if (!logoRef.current) return;

    const getRestaurantOwnerId = () => {
      if (status === "authenticated") {
        setRestaurantOwner(session?.user?.id);
      }
    };
    getRestaurantOwnerId();

    // Function to scroll to the top of the page
    function scrollToTop() {
      window.scrollTo(0, 0);
    }

    // Attach the event listener to the 'beforeunload' event
    window.addEventListener("beforeunload", scrollToTop);

    //  ======================== animation 2 ============================

    const logo = logoRef.current;
    const letters = logo.textContent.split("");

    gsap.fromTo(
      favicon.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, delay: 1, scale: 1, ease: "back.out(3)" }
    );

    logo.textContent = "";

    letters.forEach((letter) => {
      logo.innerHTML += `<span class="letter">${letter}</span>`;
    });

    gsap.set(".letter", { display: "inline-block" });
    gsap.fromTo(
      ".letter",
      { y: "100%" },
      { y: 0, delay: 0, stagger: 0.05, ease: "back.out(3)" },
      "<"
    );

    gsap.to(landingIntro.current, {
      opacity: 0,
      delay: 3.5,
      y: 0,
      duration: 4,
      ease: "back.out(3)",
    });

    gsap.to(skyline1.current, {
      delay: 2.5,
      scale: 1,
      y: -20,
      duration: 2,
      ease: "back.out(3)",
    });

    gsap.to(skyline2.current, {
      delay: 3.5,
      scale: 1,
      y: -25,
      duration: 4,
      ease: "back.out(3)",
    });

    //=====================   SCENE 1

    gsap.registerPlugin(ScrollTrigger);
    let speed = 10;

    let scene1 = gsap.timeline();
    ScrollTrigger.create({
      animation: scene1,
      trigger: landingSkylineContainer.current,
      start: "top top",
      end: "20% 5%",
      scrub: 2,
      markers: false,
    });

    // City animation
    scene1.to(sky.current, { y: -5 * speed, x: 0, ease: "power1.in" }, 0);
    scene1.to(
      mountains.current,
      { y: 5 * speed, x: -2 * speed, scale: 1.15, ease: "power1.in" },
      0
    );
    scene1.to(
      skyline1.current,
      { y: 2 * speed, x: 4 * speed, scale: 1.15 },
      0.03
    );
    scene1.to(
      skyline2.current,
      { y: -2 * speed, x: -2 * speed, scale: 1.15 },
      0.03
    );
    scene1.to(floor.current, { y: -2 * speed, x: 0 * speed }, 0.03);

    //=====================   SCENE 2
    let scene2 = gsap.timeline();
    ScrollTrigger.create({
      animation: scene2,
      trigger: landingSkylineContainer.current,
      start: "10% 5%",
      end: "30% 10%",
      scrub: 3,
      markers: false,
    });

    // Restaurant animation
    scene2.fromTo(
      landingRestaurant.current,
      { x: -750, scale: 0.4 },
      { x: 1 * speed, scale: 0.4 }
    );
    scene2.fromTo(
      landingBench.current,
      { x: 750, scale: 0.4 },
      { x: -1 * speed, scale: 0.4 },
      "<"
    );

    // =====================   SCENE 3
    let scene3 = gsap.timeline();
    ScrollTrigger.create({
      animation: scene3,
      trigger: landingSkylineContainer.current,
      start: "5% 5%",
      end: "30% 10%",
      scrub: 3,
      markers: false,
    });

    scene3.to(landingSkylineContainer.current, { y: 10 * speed }, 0.03);

    //=====================   CTA
    let cta = gsap.timeline();
    ScrollTrigger.create({
      animation: cta,
      trigger: landingSkylineContainer.current,
      start: "10% 5%",
      end: "30% 10%",
      scrub: false,
      markers: false,
    });

    scene2.to(scrolCta.current, { opacity: 0, x: 0 });
    scene2.fromTo(
      landingMainCta.current,
      { opacity: 0, x: -1000 },
      { opacity: 1, x: 0 },
      "<"
    );

    //=====================   NAV BAR
    let navbar = gsap.timeline();
    ScrollTrigger.create({
      animation: navbar,
      trigger: landingSkylineContainer.current,
      start: "110% 5%",
      end: "120% 10%",
      scrub: 3,
      markers: false,
    });

    navbar.fromTo(
      landingHeader.current,
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0 },
      "<"
    );
    navbar.fromTo(
      landingHeaderMobile.current,
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0 },
      "<"
    );
  }, [logoRef.current, status, restaurantOwnerId]);

  // Contact us
  const shadowColor = `${theme.palette.neutral[20]}1f`;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #ff5938",
    borderRadius: "10px",
    boxShadow: `0px 4px 20px 0px ${shadowColor}`,
    p: 4,
    "@media screen and (min-width:800px)": {
      width: 800,
    },
  };

  const form = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8f7cjg9",
        "template_qxlajrp",
        form.current,
        "A_nAp4McCec75xTIh"
      )
      .then(
        (result) => {
          resetForm();
          setIsModalOpen(true);
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const resetForm = () => {
    form.current.reset(); // Reset the form fields
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleMenuOpen = () => {
    cross.current.classList.toggle(styles.show);
    menu.current.classList.toggle(styles.show);
    mobileNav.current.classList.toggle(styles.show);
  };
  const handleMenuClose = () => {
    cross.current.classList.toggle(styles.show);
    menu.current.classList.toggle(styles.show);
    mobileNav.current.classList.toggle(styles.show);
  };

  return (
    <div className={styles.body_wrp}>
      <div className={styles.landing_intro} ref={landingIntro}>
        <div className={styles.landing_favicon} ref={favicon}>
          <img src="/assets_landingPage/favicon.svg" alt="icon landing page" />
        </div>
        <p ref={logoRef} className={styles.landing_logo_title}>
          dealicious
        </p>
      </div>

      {/* <!-- mobile header --> */}
      <header
        className={styles.landing_header_mobile}
        ref={landingHeaderMobile}
      >
        <img
          src="/assets_landingPage/logoNoD.svg"
          alt=""
          className={styles.landing_logo}
        />
        <div className={styles.icons_container}>
          <div
            className={`${styles.menu_container} ${styles.show}`}
            onClick={handleMenuOpen}
            ref={menu}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
          <div
            className={styles.cross_container}
            onClick={handleMenuClose}
            ref={cross}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        <div className={styles.mobile_nav_container} ref={mobileNav}>
          <nav className={styles.landing_nav}>
            <ul>
              <li className={styles.the_team}>
                <Link href="#theTeam">The Team</Link>
              </li>
              <li className={styles.contact_us}>
                <Link href="#contactUs">Contact Us</Link>
              </li>
              <div className={styles.landing_button_container}>
                <Link
                  href={`/login/owner`}
                  className={`${styles.landing_button} ${styles.landing_main_button}`}
                >
                  Sign Up as Restaurant Owner
                </Link>
                <Link
                  href={`/login/superCustomer`}
                  className={`${styles.landing_button} ${styles.landing_main_button}`}
                >
                  Sign Up as Super Costumer
                </Link>
              </div>
            </ul>
          </nav>
        </div>
      </header>
      {/* <!-- end of header --> */}

      <header className={styles.landing_header} ref={landingHeader}>
        <img
          src="/assets_landingPage/logoNoD.svg"
          alt=""
          className={styles.landing_logo}
        />
        <nav className={styles.landing_nav}>
          <ul>
            <li>
              <Link href="#theTeam">The Team</Link>
            </li>
            <li>
              <Link href="#contactUs">Contact Us</Link>
            </li>
            <div className={styles.landing_button_container}>
              <Link
                href={`/login/owner`}
                className={`${styles.landing_button} ${styles.landing_main_button}`}
              >
                Sign Up as Restaurant Owner
              </Link>
              <Link
                href={`/login/superCustomer`}
                className={`${styles.landing_button} ${styles.landing_main_button}`}
              >
                Sign Up as Super Costumer
              </Link>
            </div>
          </ul>
        </nav>
      </header>

      {/* <!-- hero section --> */}
      <main className={styles.landing_hero}>
        <div ref={scrolCta} className={styles.scroll_cta}>
          <p className={styles.fade_in_out}>Scroll down to explore...</p>
          <i className="fa-solid fa-angles-down arrow bounce"></i>
        </div>

        <div
          className={styles.landing_skyline_container}
          ref={landingSkylineContainer}
        >
          <img
            id={styles.sky}
            ref={sky}
            src="/assets_landingPage/skyline/sky2.svg"
            alt=""
          />

          <div className={styles.mountain_container}>
            <img
              id={styles.mountains}
              ref={mountains}
              className={styles.landing_mountains}
              src="/assets_landingPage/skyline/mountains2.svg"
              alt=""
            />
          </div>

          <div className={styles.skyline_illustration_container}>
            <img
              id={styles.skyline1}
              src="/assets_landingPage/skyline/skyline1-2.svg"
              alt=""
              ref={skyline1}
            />
          </div>

          <div className={styles.skyline_illustration_container}>
            <img
              id={styles.skyline2}
              src="/assets_landingPage/skyline/skyline2-2.svg"
              alt=""
              ref={skyline2}
            />
          </div>

          <div className={styles.floor_container}>
            <img
              id={styles.floor}
              ref={floor}
              src="/assets_landingPage/skyline/floor2.svg"
              alt=""
            />
          </div>

          <div className={styles.restaurant_container}>
            <img
              id={styles.landingRestaurant}
              className={styles.landing_restaurant}
              src="/assets_landingPage/skyline/restaurant2.svg"
              ref={landingRestaurant}
              alt=""
            />
          </div>

          <img
            id={styles.landingBench}
            ref={landingBench}
            className={styles.landing_bench}
            src="/assets_landingPage/skyline/bench2.svg"
            alt=""
          />
          <div
            className={`${styles.airplane_container} ${styles.airplane_top}`}
          >
            <img
              className={styles.landing_airplane}
              src="assets_landingPage/skyline/airplane.svg"
              alt=""
            />
          </div>
          <div
            className={`${styles.airplane_container} ${styles.airplane_bottom}`}
          >
            <img
              className={styles.landing_airplane}
              src="assets_landingPage/skyline/airplane.svg"
              alt=""
            />
          </div>
        </div>

        <div className={styles.landing_main_cta} ref={landingMainCta}>
          <div className={styles.cta_container}>
            <img
              src="/assets_landingPage/loginLogo.svg"
              className={styles.landing_main_logo}
            />
            <h2 className={styles.landing_main_title}>Taste of Growth!</h2>
          </div>
          {status === "loading" ? (
            <LoaderSession />
          ) : session?.user?.id === undefined && !session ? (
            <div className={styles.landing_button_container}>
              <Link href={`/login/owner`}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary[80],
                    marginTop: "20px",
                    marginRight: "20px",
                    ":hover": {
                      backgroundColor: "white",
                      color: theme.palette.primary[80],
                    },
                  }}
                >
                  Sign Up as Restaurant Owner
                </Button>
              </Link>
              <Link href={`/login/superCustomer`}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary[80],
                    marginTop: "20px",
                    marginRight: "20px",
                    ":hover": {
                      backgroundColor: "white",
                      color: theme.palette.primary[80],
                    },
                  }}
                >
                  Sign Up as Super Customer
                </Button>
              </Link>
            </div>
          ) : (
            <Button
              onClick={signOut}
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary[80],
                marginTop: "20px",
                marginRight: "20px",
                ":hover": {
                  backgroundColor: "white",
                  color: theme.palette.primary[80],
                },
              }}
            >
              Sign Out
            </Button>
          )}
        </div>
      </main>

      <section id="why-us" className={styles.landing_why_us}>
        <div className={styles.why_us_container}>
          <div className={styles.why_us_text}>
            <h2
              style={{
                fontSize: "3rem",
                color: "#ff5938",
              }}
              className={styles.landing_why_us_tilte}
            >
              Why Us?
            </h2>
            <p>
              Dealicious is a web platform that provides an effective solution
              for Food Hospitalities to create referral marketing campaigns and
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

      {/* <!-- features section --> */}
      <div className={styles.landing_features_container}>
        <section
          className={`${styles.landing_section} ${styles.landing_features}`}
        >
          <h2
            className={styles.landing_section_title}
            style={{
              fontSize: "2.5rem",
              color: "#ff5938",
            }}
          >
            Our Features
          </h2>
          <div className={styles.features_container}>
            <div className={styles.landing_feature}>
              <div className={styles.feature_container}>
                <img src="/assets_landingPage/features/campaigns.svg" alt="" />
                <h3>Referral Marketing</h3>
              </div>
              <p>
                We empower food businesses to effortlessly create targeted
                marketing campaigns, using a user-friendly interface and an AI
                Generator for personalized offers to attract new and returning
                customers.
              </p>
            </div>
            <div className={styles.landing_feature}>
              <div className={styles.feature_container}>
                <img src="/assets_landingPage/features/insights.svg" alt="" />
                <h3>Extensive Insights</h3>
              </div>
              <p>
                We offer comprehensive data analysis to business owners,
                providing valuable insights into the performance of their
                marketing&nbsp;campaigns.
              </p>
            </div>
            <div className={styles.landing_feature}>
              <div className={styles.feature_container}>
                <img
                  src="/assets_landingPage/features/superCostumer.svg"
                  alt=""
                />
                <h3>Loyalty Programs</h3>
              </div>
              <p>
                We go beyond acquiring new customers. Our platform incorporates
                a robust loyalty program that allows business owners to reward
                and incentivize existing customers.
              </p>
            </div>
            <p>
              Whether it’s creating customized campaigns, tracking campaign
              performance, or rewarding Super Customers, <span>Dealicious</span>
              &nbsp;provides a comprehensive solution to drive increased sales
              and sustainable growth.
            </p>
          </div>
          <div className={styles.features_cta}>
            <Link href="#" className={styles.landing_button}>
              Discover
            </Link>
          </div>
        </section>
      </div>

      {/* <!-- the team section --> */}

      <section
        className={`${styles.landing_section} ${styles.landing_the_team}`}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            color: "#ff5938",
          }}
          className={styles.landing_section_title}
        >
          Our Team
        </h2>
        <div className={styles.members_container} id="the_team">
          {/* edgar */}
          <div className={styles.member}>
            <div className={styles.member_top}>
              <div
                className={`${styles.illustration_container} ${styles.edgar}`}
              ></div>
              <div className={styles.member_info}>
                <p className={styles.name}>Edgar Velandia</p>
                <p className={styles.title}>Full Stack Developer</p>
                <div className={styles.linkedin}>
                  <i
                    className={`${styles.fa_brands} ${styles.fa_linkedin}`}
                  ></i>
                  <Link
                    href="https://www.linkedin.com/in/edgarvelandia"
                    className={styles.linkedin_link}
                  >
                    edgarvelandia
                  </Link>
                </div>
              </div>
            </div>
            <p className={styles.description}>
              I have helped businesses in their digital transformation journey
              through adept utilization of Microsoft Dynamics technologies.
              Concurrently, I am enhancing my proficiency as a web and mobile
              developer. | D365F&O | Power Platform | React | Next JS | Material
              UI | Express JS | Node JS | Mongo DB
            </p>
          </div>

          {/* ziyun */}
          <div className={styles.member}>
            <div className={styles.member_top}>
              <div
                className={`${styles.illustration_container} ${styles.ziyun}`}
              ></div>
              <div className={styles.member_info}>
                <p className={styles.name}>Ziyun Yue</p>
                <p className={styles.title}>Full Stack Developer</p>
                <div className={styles.linkedin}>
                  <i
                    className={`${styles.fa_brands} ${styles.fa_linkedin}`}
                  ></i>
                  <Link
                    href="https://www.linkedin.com/in/ziyunyue"
                    className={styles.linkedin_link}
                  >
                    ziyunyue
                  </Link>
                </div>
              </div>
            </div>
            <p className={styles.description}>
              Two years of experiences in E-commerce, with a keen interest in
              front-end development and clean energy industry.
            </p>
          </div>

          {/* mario */}
          <div className={styles.member}>
            <div className={styles.member_top}>
              <div
                className={`${styles.illustration_container} ${styles.mario}`}
              ></div>
              <div className={styles.member_info}>
                <p className={styles.name}>Mario Cesena</p>
                <p className={styles.title}>Full Stack Developer</p>
                <div className={styles.linkedin}>
                  <i
                    className={`${styles.fa_brands} ${styles.fa_linkedin}`}
                  ></i>
                  <Link
                    href="https://www.linkedin.com/in/mariocesena"
                    className={styles.linkedin_link}
                  >
                    mariocesena
                  </Link>
                </div>
              </div>
            </div>
            <p className={styles.description}>
              Bachelor’s degree in Mechatronics Engineering. Worked as a
              Manufacturing and Equipment Engineer for almost 4 years in Mexico.
              React | Next JS | Material UI | Express JS | Node JS | Mongo DB
            </p>
          </div>

          {/* tony */}
          <div className={styles.member}>
            <div className={styles.member_top}>
              <div
                className={`${styles.illustration_container} ${styles.tony}`}
              ></div>
              <div className={styles.member_info}>
                <p className={styles.name}>Tony Saengthamchai</p>
                <p className={styles.title}>Full Stack Developer</p>
                <div className={styles.linkedin}>
                  <i
                    className={`${styles.fa_brands} ${styles.fa_linkedin}`}
                  ></i>
                  <Link
                    href="https://www.linkedin.com/in/tony-sa"
                    className={styles.linkedin_link}
                  >
                    tony-sa
                  </Link>
                </div>
              </div>
            </div>
            <p className={styles.description}>
              Full-stack developer, ex-advertising CEO specializing in social
              issues campaigns with over 15 years of experience. I build
              products people love with a strong understanding of user
              experience. <br />
              React | Next JS | Material UI | Express JS | Node JS | Mongo DB
            </p>
          </div>

          {/* nahla */}
          <div className={styles.member}>
            <div className={styles.member_top}>
              <div
                className={`${styles.illustration_container} ${styles.nahla}`}
              ></div>
              <div className={styles.member_info}>
                <p className={styles.name}>Nahla Niavarani</p>
                <p className={styles.title}>UI/UX Designer</p>
                <div className={styles.linkedin}>
                  <i
                    className={`${styles.fa_brands} ${styles.fa_linkedin}`}
                  ></i>
                  <Link
                    href="https://www.linkedin.com/in/nahlania"
                    className={styles.linkedin_link}
                  >
                    nahlania
                  </Link>
                </div>
              </div>
            </div>
            <p className={styles.description}>
              With an engineering background and ten years of experience in
              digital media, I specialize in developing human-centered solutions
              that seamlessly blend technical mindset with artistic flair.
            </p>
          </div>

          {/* surbhi */}
          <div className={styles.member}>
            <div className={styles.member_top}>
              <div
                className={`${styles.illustration_container} ${styles.surbhi}`}
              ></div>
              <div className={styles.member_info}>
                <p className={styles.name}>Surbhi Kataria</p>
                <p className={styles.title}>UI/UX Designer</p>
                <div className={styles.linkedin}>
                  <i
                    className={`${styles.fa_brands} ${styles.fa_linkedin}`}
                  ></i>
                  <Link
                    href="https://www.linkedin.com/in/surbhikataria"
                    className={styles.linkedin_link}
                  >
                    surbhikataria
                  </Link>
                </div>
              </div>
            </div>
            <p className={styles.description}>
              I am an experienced Visual Communication Designer with a skillset
              apt for analytical, strategic and experiential design, across
              multiple industries. Working as a Graphic Designer for last 6
              years and transitioning to UI/UX designer.
            </p>
          </div>

          {/* pablo */}
          <div className={styles.member}>
            <div className={styles.member_top}>
              <div
                className={`${styles.illustration_container} ${styles.pablo}`}
              ></div>
              <div className={styles.member_info}>
                <p className={styles.name}>Pablo Montoya Varela</p>
                <p className={styles.title}>UI/UX Designer</p>
                <div className={styles.linkedin}>
                  <i
                    className={`${styles.fa_brands} ${styles.fa_linkedin}`}
                  ></i>
                  <Link
                    href="https://www.linkedin.com/in/palimv"
                    className={styles.linkedin_link}
                  >
                    palimv
                  </Link>
                </div>
              </div>
            </div>
            <p className={styles.description}>
              After transitioning from Product Design, I am now fully dedicated
              to UI and UX, progressing as a UI designer, Front-end enthusiast,
              and passionate UX explorer. <br />
              Ai | Ae | Ps | Figma | HTML | CSS | SASS | JS
            </p>
          </div>
        </div>
      </section>

      {/* <!-- contact us section --> */}
      <section
        id={styles.contact}
        className={`${styles.landing_section} ${styles.landing_contact}`}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            color: "#ff5938",
          }}
          className={styles.landing_section_title}
        >
          Contact Us
        </h2>

        <div className={styles.landing_ziyun}>
          <img
            className={styles.ziyun_arm}
            src="/assets_landingPage/ziyun/ziyunArm.svg"
            alt=""
          />
          <img
            className={styles.ziyun_body}
            src="/assets_landingPage/ziyun/ziyunBody.svg"
            alt=""
          />
        </div>

        <div className={styles.form_container}>
          <form
            className={styles.landing_form}
            action=""
            ref={form}
            onSubmit={sendEmail}
          >
            <div className={styles.input_container}>
              <div className={styles.label_input}>
                <label htmlFor="fname">Name</label>
                <input
                  type="text"
                  id="fname"
                  name="user_name"
                  placeholder="Your name..."
                  required
                />
              </div>

              <div className={styles.label_input}>
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  placeholder="Your email..."
                  required
                />
              </div>
            </div>

            <div className={styles.input_container}>
              <div className={styles.label_input}>
                <label htmlFor="bname">Business Name</label>
                <input
                  type="text"
                  id="bname"
                  name="user_business"
                  placeholder="Your business' name..."
                />
              </div>

              <div className={styles.label_input}>
                <label htmlFor="pnumber">Phone Number</label>
                <input
                  type="number"
                  id="pnumber"
                  name="user_phone"
                  placeholder="Your phone number..."
                />
              </div>
            </div>

            <div className={styles.label_input}>
              <label htmlFor="subject">Subject</label>
              <textarea
                id="subject"
                name="user_message"
                placeholder="Write something.."
                style={{
                  height: "200px",
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  borderColor: "#1c1e3a",
                  resize: "none",
                }}
              ></textarea>
            </div>

            <input
              className={styles.landing_button}
              type="submit"
              //value="Submit"
              value="Send"
            />
          </form>
          <Modal open={isModalOpen} onClose={closeModal}>
            <Box sx={style}>
              <CloseIcon
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                }}
                onClick={closeModal}
              />
              <Typography
                id="modal-modal-title"
                variant="h3"
                sx={{ color: "#ff5938" }}
              >
                Email sent successfully!
              </Typography>
            </Box>
          </Modal>
        </div>
      </section>
      <footer className={styles.landing_footer}>
        <div className={styles.logo_container}>
          <img
            className={styles.landing_logo}
            src="assets_landingPage/logoNoD.svg"
            alt=""
          />
          <p>
            &copy; Team <b>Apollo7.</b> All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
