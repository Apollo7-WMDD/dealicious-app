"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import SCShare from "../../components/Button/SCShare";

const Share = ({ superCustomerId, restaurantId, restaurantData }) => {
  return (
      <Box
        sx={{
          maxWidth: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          textAlign: "center",
          justifyContent: "space-evenly",
          borderRadius: "10px",
          p:'1rem',
          borderRadius: "10px",
          boxShadow: 10,
        }}
      >
        <Typography variant="h2">
          Refer your friends and earn points!
        </Typography>
        <Typography 
          variant="p"
          sx={{
            lineHeight: 2, 
          }}
          >Introducing our special campaign referral program, 
        where you can share exclusive campaigns with your friends through any social network. 
        Get 500 points when someone successful uses the any campaign using your referral link.</Typography>
        {/* <ShareLink></ShareLink> */}
        <SCShare
          text="Share with friends"
          width="244px"
          superCustomerId={superCustomerId}
          restaurantId={restaurantId}
          restaurantData={restaurantData}
        />
      </Box>
  );
};

export default Share;
