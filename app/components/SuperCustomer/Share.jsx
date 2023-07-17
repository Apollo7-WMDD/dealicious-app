"use client";
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Card, CardActions, CardContent, Box, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
// import SingleButton from '../../components/Button/SingleButton';
import SCShare from '../../components/Button/SCShare';


const Share = ({ props }) => {
  
return (
  <Paper elevation={10}>
    <Box 
      sx={{
        // boxShadow: '5px 5px 5px 5px rgba(255, 255, 0, 0.5)',
        maxWidth: 'auto',
        display:'flex',
        flexDirection: 'column',
        gap:'3%',
        textAlign:'center',
        justifyContent: 'center',
        borderRadius: '5%'
      }}
    >
        <Typography variant="h2">Refer your friends and earn points!</Typography>
        <Typography variant="p">where is this text?</Typography>
        <SCShare text="Share with friends" width="244px" />
    </Box>
  </Paper>
  );
};

export default Share;