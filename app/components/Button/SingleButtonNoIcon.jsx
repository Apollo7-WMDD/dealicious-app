import React from "react";
import { Button, Box, useTheme } from "@mui/material";
import DealIcon from "@/app/components/svg/dealIcon.svg";

const SingleButtonNoIcon = ({ text, onClick, width }) => {
  const theme = useTheme();
  return (
        <Button
            variant="contained"
            size="medium"
            onClick={onClick}
            sx={{
                width: width,
                alignSelf: "center",
                borderRadius: "12px",
                backgroundColor: theme.palette.primary[80],
                ":hover": {
                backgroundColor: theme.palette.primary[60],
                },
            }}
            >
            {text}
        </Button>
  );
};

export default SingleButtonNoIcon;
