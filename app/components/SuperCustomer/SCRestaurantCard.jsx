"use client";
import React from "react";
import StarIcon from "@/app/components/svg/star.svg";
import Location from "@/app/components/svg/location.svg";
import CopyIcon from "@/app/components/svg/copyIcon.svg";
import Clock from "@/app/components/svg/clock.svg";
import Phone from "@/app/components/svg/phone.svg";
import URL from "@/app/components/svg/url.svg";
import { CardContent, Box, Typography, useTheme } from "@mui/material";

const SCRestaurantCard = (props) => {

const theme = useTheme();
const shadowColor = `${theme.palette.neutral[20]}1f`;
  if (!props || !props.address) {
    return null; 
  }
return (
    <Box 
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        borderRadius: "10px",
        p: "1rem",
        boxShadow: `0px 4px 20px 0px ${shadowColor}`,
        flexWrap: 'wrap',
        flex:'1 0 50%',
        justifyContent: 'center',

        "@media screen and (min-width:800px)": {
          justifyContent:'center',
        },        

        "@media screen and (min-width:1300px)": {
          justifyContent: 'space-between',
        },
      }}
    >
      <Box sx={{}}>
        <Box
          sx={{
            display: "flex",
            direction: "row",
            alignItems: "center",
            m: "0 1rem",
            p: "0 0 2rem 0",
          }}
        >
          <Box>
            <img
              src={props?.logo}
              style={{
                borderRadius: "50%",
                width: "90px", 
                height: "90px",
                objectFit: "cover",
              }}
              alt="Logo"
            />
          </Box>
          <CardContent
            sx={{
              m: "0 0 0 1rem",
              textAlign: "start",
            }}
            style={{
              padding: "0",
            }}
          >
            <Typography gutterBottom variant="h3" component="div">
              {props?.name}
            </Typography>
            <Typography variant="p" color="text.secondary">
              4.5{" "}
              <StarIcon
                sx={{
                  m: 0,
                  p: 0,
                }}
              />{" "}
              Peruvian * Cafe * Bistro
            </Typography>
          </CardContent>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            m: '0 1rem',
            gap:'0.5rem',
          }}
        >
          <Typography variant="p" color="text.secondary"
            sx={{
              display:'flex',              
              gap:'1rem',
            }}
          >
            <Location /> {props?.address?.street}, {props?.address?.city},{" "}
            {props?.address?.province}, {props?.address?.zipcode} <CopyIcon />
          </Typography>
          <Typography variant="p" color="text.secondary"
            sx={{
              display:'flex',              
              gap:'1rem',
            }}
          >
            <Clock /> Everyday: 5 pm - 10 pm
          </Typography>
          <Typography variant="p" color="text.secondary"
            sx={{
              display:'flex',              
              gap:'1rem',
            }}
          >
            <Phone /> {props?.phone}
          </Typography>
          <Typography variant="p" color="text.secondary"
            sx={{
              display:'flex',              
              gap:'1rem',
            }}
          >
            <URL /> {props?.website}
          </Typography>
        </Box>
      </Box>
      <Box>
        <img
          src={props?.menu}
          alt="new"
          style={{ 
            borderRadius: "10px",
            maxWidth:'100%',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Box>
  );
};

export default SCRestaurantCard;
