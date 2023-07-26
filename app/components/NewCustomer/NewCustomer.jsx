"use client";
import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";

const Share = ({ props }) => {
const theme = useTheme();
const shadowColor = `${theme.palette.neutral[20]}1f`;

return (
    <Box 
      sx={{
        maxWidth: 'auto',
        display:'flex',
        flexDirection: 'column',
        gap:'3%',
        textAlign:'start',
        justifyContent: 'space-evenly',
        borderRadius: '10px',
        boxShadow: `0px 4px 20px 0px ${shadowColor}`,
        p:'1rem',
        m:0,
      }}
    >
        <Typography variant="p">Experience culinar bliss with a special invitation from</Typography>
        <Typography variant="h2">{props?.firstname} {props?.lastname}</Typography>
        {/* <Typography variant="h2"></Typography> */}
        <Typography variant="p">Activate your favourite campaign at our place and embark on a remarkable
        culinary adventure unlike any other</Typography>
    </Box>
  );
};

export default Share;