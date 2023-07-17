"use client";
import React from 'react';
import { Box, Typography } from "@mui/material";

const Share = ({ props }) => {
  
return (
    <Box 
      sx={{
        maxWidth: 'auto',
        display:'flex',
        flexDirection: 'column',
        gap:'3%',
        textAlign:'start',
        justifyContent: 'start',
        borderRadius: '10px',
        boxShadow: 20,
        p:'1rem',
        m:0,
      }}
    >
        <Typography variant="p">Experience culinar bliss with a special invitation from</Typography>
        <Typography variant="h2">{props.firstname}</Typography>
        <Typography variant="h2">{props.lastname}</Typography>
        <Typography variant="p">Activate your favourite campaign at our place and embark on a remarkable
        culinary adventure unlike any other</Typography>
    </Box>
  );
};

export default Share;