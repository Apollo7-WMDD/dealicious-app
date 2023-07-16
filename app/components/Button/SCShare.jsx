import React from "react";
import { Button, Box, useTheme, Typography } from "@mui/material";
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';

const SCShare = ({ text, width }) => {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      size="medium"
      startIcon={<AirlineStopsIcon />}
      //onClick={onClick}
      sx={{
        width: width,
        height: "44px",
        justifySelf: "end",
        alignSelf: "center",
        borderRadius: "12px",
        backgroundColor: theme.palette.primary[80],
        ":hover": {
          backgroundColor: theme.palette.primary[60],
        },
        [theme.breakpoints.down('lg')]: {
         width: "265px",
         fontSize: "16px",
      },
        [theme.breakpoints.down('md')]: {
          width: "180px",
          fontSize: "14px",
          lineHeight: "16px",
          margin: "1rem 0",
          // alignSelf: "start",
          justifySelf: "start",
        }
      }}
    >
    <Typography variant="p">{text}</Typography>
    </Button>
  );
};

export default SCShare;
