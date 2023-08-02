import Footer from "../Footer";
import ContactUs from "./ContactUs";
import Features from "./Features";
import Header from "./Header";
import HeroSection from "./HeroSection";
import IntroAnimation from "./IntroAnimation ";
import Team from "./Team";
import WhyUs from "./WhyUs";

const HomePage = () => {
  return (
    <>
      <IntroAnimation />
      <Header />
      <HeroSection />
      <WhyUs />
      <Features />
      <Team />
      <ContactUs />
      <Footer />
    </>
  );
};

export default HomePage;
