"use client";
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Card, CardActions, CardContent, Box, Typography } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { shadows } from '@mui/system';
import Paper from '@mui/material/Paper';


const SCRestaurantCard = ({ props }) => {
  
return (
  <Paper elevation={10}>
    <Box 
      sx={{
        // boxShadow: '5px 5px 5px 5px rgba(255, 255, 0, 0.5)',
        maxWidth: 'auto',
        display:'flex',
        flexDirection: 'row',
        gap:'3%',
        borderRadius: '5%'
      }}
    >
      <Box
        sx={{
          
        }}
      >
        <Box
          sx={{
            display:'flex',
            flexDirection: 'row'
          }}
          >
          <img 
          src={props.logo}
          alt="new" width="70px" height="70px"
          style={{ borderRadius: '50%' }}
          />
          <CardContent
            sx={{
              p:0,
              m:0,
              textAlign:'center',
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {props.name}
            </Typography>
            <Typography variant="p" color="text.secondary">
              4.5<StarIcon /> Peruvian * Cafe * Bistro 
            </Typography>
          </CardContent>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
          >
          <Typography variant="p" color="text.secondary">
            <PlaceIcon/> {props.address.street}, {props.address.city}, {props.address.province}, {props.address.zipcode} <ContentCopyIcon/>
          </Typography>
          <Typography variant="p" color="text.secondary">
            <PhoneIcon/> {props.phone}
          </Typography>
          <Typography variant="p" color="text.secondary">
            <OpenInNewIcon/> {props.website}
          </Typography>
        </Box>
      </Box>
      <img 
          src={props.menu}
          alt="new" width="200px" height="200px"
          style={{ borderRadius: '10%' }}
        />
    </Box>
  </Paper>
  );
};

export default SCRestaurantCard;