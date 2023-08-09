import React from "react";
import { Button, Box, useTheme, Typography } from "@mui/material";
import CampaignSCIcon from "../Button/ButtonCampaignSC";

const SCActive = ({ text, width, onClick }) => {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      size="medium"
      startIcon={<CampaignSCIcon />}
      onClick={onClick}
      sx={{
        width: width,
        height: "2.75rem",
        boxShadow: "none",
        justifySelf: "end",
        alignSelf: "center",
        borderRadius: "12px",
        backgroundColor:'white',
        border: '3px solid #ff5938',
        color: '#ff5938',
        '& svg': {
          fill: '#ff5938',
        },
        ":hover": {
          backgroundColor: "#ff5938",
          color: 'white',
          boxShadow: "none",
          '& svg': {
            fill: 'white',
          },
        },
        [theme.breakpoints.down("lg")]: {
          width: "265px",
          // fontSize: "16px",
        },
        [theme.breakpoints.down("md")]: {
          width: "180px",
          // fontSize: "14px",
          lineHeight: "16px",
          margin: "1rem 0",
          justifySelf: "start",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default SCActive;
