import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import SingleButtonNoIcon from "../Button/SingleButtonNoIcon";

const Notification = ({ header, text, buttonText, buttonAction }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box 
      sx={{
        display: 'flex',
        width: { xs: 358, md: 454 },
        padding: '16px 24px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        borderRadius: '8px',
        backgroundColor: 'var(--base-colour-20, #FEFEFE)',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.25)'
      }}
    >
      <Typography variant="h5" component="h2">{header}</Typography>
      <Typography variant="body1">{text}</Typography>
      <SingleButtonNoIcon text={buttonText} onClick={buttonAction} />
    </Box>
  );
};

export default Notification;
