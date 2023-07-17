import React from "react";
import { Button, Box, useTheme, Typography } from "@mui/material";
import DealIcon from "@/app/components/svg/dealIcon.svg";

const SCActive = ({ text, width, onClick }) => {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      size="medium"
      startIcon={<DealIcon />}
      onClick={onClick}
      sx={{
        width: width,
        height: "44px",
        justifySelf: "end",
        alignSelf: "center",
        borderRadius: "12px",
        border: '3px solid #ff5938',
        backgroundColor: 'white',
        color: '#ff5938',
      }}
    >
    <Typography variant="p">{text}</Typography>
    </Button>
  );
};

export default SCActive;
