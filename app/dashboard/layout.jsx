import Sidebar from "../components/Dashboard/Sidebar";
import Footer from "../components/Footer";
import CreateNewCampaign from "../components/Dashboard/CreateNewCampaign";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="flex min-h-screen">
        <Sidebar className="flex-1" />
        <section className="flex-grow min-h-full">{children}</section>
        <CreateNewCampaign className="m-5" />
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
