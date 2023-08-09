"use client"
import Footer from "../components/Footer";
import SCfootter from "@/app/components/Footer/SCFooter";
import SideBar from "../components/sidebar/SideBar";
import { useMediaQuery } from "@mui/material";

const DashboardLayout = ({ children }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <div>
      <div
      
        style={{
          display: "flex",
        }}
      >
        <SideBar />

        <div style={{ width: "100%",
        
        height:"calc(100% - 80px)" 
        
        }}>
          <div
            style={{
              margin: "2rem auto 0 auto",
              maxWidth: "1164px",
              padding: "0 2%",
              
            }}
          >
            {children}
          </div>
          <SCfootter />
          {isNonMobile ? null : <div style={{height:"80px"}} />}
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
