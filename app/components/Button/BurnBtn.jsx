import React from "react";
import { Button, Box, useTheme, Typography } from "@mui/material";
import BurnCodeIcon from "../burnCode/BurnCodeIcon";

const BurnBtn = ({ text, width, onClick }) => {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      size="medium"
      startIcon={<BurnCodeIcon />}
      onClick={onClick}
      sx={{
        width: width,
        height: "70%",
        boxShadow: "none",
        justifySelf: "end",
        alignSelf: "center",
        borderRadius: "8px",
        p: "0.85rem 1.25rem",
        backgroundColor: "white",
        border: "3px solid #ff5938",
        color: "#ff5938",
        "& svg": {
          fill: "#ff5938",
        },
        ":hover": {
          backgroundColor: "#ff5938",
          color: "white",
          boxShadow: "none",
          "& svg": {
            fill: "white",
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
          justifySelf: "start",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default BurnBtn;
