import React from "react";
import { Button, Box, useTheme, Typography } from "@mui/material";
import DealIcon from "@/app/components/svg/dealIcon.svg";
import ButtonCampaignNew from "../Button/ButtonCampaignNew";

const SCActive = ({ text, width, onClick }) => {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      size="medium"
      startIcon={<ButtonCampaignNew />}
      onClick={onClick}
      sx={{
        width: width,
        height: "70%",
        boxShadow: "none",
        justifySelf: "end",
        alignSelf: "center",
        borderRadius: "12px",
        backgroundColor:'white',
        border: '3px solid #ff5938',
        color: '#ff5938',
        // '.icon': { // Use the custom class name to target the SVG icon
        //   stroke: '#ff5938', // Change this to the desired color for the SVG icon border on hover
        // },
        '& svg': {
          fill: '#ff5938',
        },
        // backgroundColor: theme.palette.primary[80],
        ":hover": {
          backgroundColor: "#ff5938",
          color: 'white',
          boxShadow: "none",
          // '.icon': { // Use the custom class name to target the SVG icon
          //   stroke: 'white', // Change this to the desired color for the SVG icon border on hover
          // },
          '& svg': {
            fill: 'white',
          },
        },
        [theme.breakpoints.down("lg")]: {
          width: "265px",
          fontSize: "16px",
        },
        [theme.breakpoints.down("md")]: {
          width: "180px",
          fontSize: "14px",
          lineHeight: "16px",
          margin: "1rem 0",
          // alignSelf: "start",
          justifySelf: "start",
        },
      }}
    >
      {text}
    </Button>
    // <Button
    //   variant="contained"
    //   size="medium"
    //   startIcon={<DealIcon />}
    //   onClick={onClick}
    //   sx={{
    //     width: width,
    //     height: "44px",
    //     justifySelf: "end",
    //     alignSelf: "center",
    //     borderRadius: "12px",
    //     border: '3px solid #ff5938',
    //     backgroundColor: 'white',
    //     color: '#ff5938',
    //     fontWeight: 'bold',
    //     '&:hover': {
    //       color: 'white',
    //       backgroundColor: '#ff5938', // Change this to the desired hover color
    //     },
    //   }}
    // >
    // <Typography variant="p">{text}</Typography>
    // </Button>
  );
};

export default SCActive;
