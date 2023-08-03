import Footer from "../components/Footer";
import SCfootter from '@/app/components/Footer/SCFooter'
import SideBar from "../components/sidebar/SideBar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{width: "100%" }}>
          <div style={{ margin: "2rem auto 0 auto", maxWidth: "1164px", }}>
            {children}
          </div>
          <SCfootter/>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
