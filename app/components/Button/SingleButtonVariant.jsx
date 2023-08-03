import React from "react";
import { Button, Box, useTheme } from "@mui/material";
import ButtonCampaignRecreate from "./ButtonCampaignRecreate";

const SingleButonVariant = ({ text, onClick, width }) => {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      size="medium"
      startIcon={<ButtonCampaignRecreate />}
      onClick={onClick}
      sx={{
        padding: "1rem 1rem",
        width: width,
        height: "70%",
        boxShadow: "none",
        justifySelf: "end",
        alignSelf: "center",
        borderRadius: "12px",
        backgroundColor: theme.palette.primary[80],
        ":hover": {
          backgroundColor: "#FF2D2D",
          boxShadow: "none",
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
        [theme.breakpoints.down("sm")]: {
          width: "90px",
          justifyContent: "end",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default SingleButonVariant;
