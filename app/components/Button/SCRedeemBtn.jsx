import React from "react";
import { Button, Box, useTheme } from "@mui/material";
import { Typography } from "@mui/material";

const SCRedeemBtn = ({ text, width }) => {
  const theme = useTheme();
  return (
    <Button
      variant="outlined"
      size="medium"
    //   onClick={onClick}
      sx={{
        width: width,
        height: "44px",
        alignSelf: "center",
        borderRadius: "12px",        
        border: '3px solid #ff5938',
        color: '#ff5938'
      }}
    >
        <Typography variant="p">{text}</Typography>
    </Button>
  );
};

export default SCRedeemBtn;
