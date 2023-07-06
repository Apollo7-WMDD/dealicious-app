import Footer from "../components/Footer";
import CreateNewCampaign from "../components/Dashboard/CreateNewCampaign";
import ThemeWrapper from "../components/ThemeWrapper";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="flex min-h-screen">
        <ThemeWrapper />
        <section className="flex-grow min-h-full" style={{ margin: "2rem 2%" }}>
          {children}
        </section>
        <CreateNewCampaign className="m-5" />
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
