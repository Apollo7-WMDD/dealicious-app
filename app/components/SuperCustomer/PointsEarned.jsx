"use client";
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Card, CardActions, CardContent, Box, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
// import SingleButton from '../../components/Button/SingleButton';
import SCRedeemBtn from '../../components/Button/SCRedeemBtn';


const PointsEarned = ({ props }) => {
  
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
        <Typography variant="h2">Points Earned</Typography>
        <Typography variant="p">Keep earning points to get a rewards or redeem points and get discounts!</Typography>
        <Box
            sx={{
                display:'flex',
                flexDirection:'row',
            }}
        >
            <PersonAddAlt1Icon/>
            <Typography variant="h3">{props}</Typography>
        </Box>
        <Typography variant="p">*20 points = $2</Typography>
        <SCRedeemBtn text="Redeem Points" width="144px" />
    </Box>
  </Paper>
  );
};

export default PointsEarned;