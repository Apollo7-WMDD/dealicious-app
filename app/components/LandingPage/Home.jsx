"use client";

// import next js
import Image from "next/image";

// import assets
import BlobRed from "../svg/home_blob_red.svg";
import BlobGreen from "../svg/home_blob_green.svg";
import Banner from "../../../public/home-banner-image.png";

// import components
import Navbar from "./Navbar";

// import titles
import Header from "../Header/Header";
import SubHeader from "../Header/SubHeader";

// import mui components
import { Button, Typography } from "@mui/material";

// import theme
import { useTheme } from "@mui/material";

const Home = ({ status }) => {
  const theme = useTheme();
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <BlobRed />
        </div>
        <div className="home-bannerImage-container2">
          <BlobGreen />
        </div>

        <div className="home-text-section">
          <Typography variant="h1_lp" sx={{ color: theme.palette.primary }}>
            Dealicious!
          </Typography>
          <Typography variant="h3" sx={{ color: theme.palette.neutral }}>
            Your favourite App to get the best deals
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary[80],
              marginTop: "20px",
              ":hover": {
                backgroundColor: "white",
                color: theme.palette.primary[80],
              },
            }}
          >
            Join now
          </Button>
        </div>
        <div className="home-image-section">
          {/* <Image
            src={"/public/home-banner-image.png"}
            alt=""
            width={500}
            height={500}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
