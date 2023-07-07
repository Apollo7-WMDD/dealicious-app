import Footer from "../components/Footer";
import CreateNewCampaign from "../components/Dashboard/CreateNewCampaign";
import ThemeWrapper from "../components/ThemeWrapper";

import { Box } from "@mui/material";
const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div
        style={{ display: "flex" }}
      >
        <ThemeWrapper children={children} />
    
      </div>
      
    </div>
  );
};

export default DashboardLayout;
