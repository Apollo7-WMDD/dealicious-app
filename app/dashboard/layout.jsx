import Sidebar from "../components/Dashboard/Sidebar";
import Footer from "../components/Footer";
import { DashboardProvider } from "./context/DashboardContext";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <DashboardProvider>
        <div className="flex min-h-screen">
          <Sidebar className="flex-1" />
          <section className="flex-grow min-h-full">{children}</section>
        </div>
        <Footer />
      </DashboardProvider>
    </div>
  );
};

export default DashboardLayout;
