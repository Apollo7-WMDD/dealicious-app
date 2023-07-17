"use client";
import React from "react";
import StarIcon from "@/app/components/svg/star.svg";
import Location from "@/app/components/svg/location.svg";
import CopyIcon from "@/app/components/svg/copyIcon.svg";
import Clock from "@/app/components/svg/clock.svg";
import Phone from "@/app/components/svg/phone.svg";
import URL from "@/app/components/svg/url.svg";
import { CardContent, Box, Typography } from "@mui/material";

const SCRestaurantCard = ({ props }) => {
  return (
    <Box
      sx={{
        maxWidth: "auto",
        display: "flex",
        flexDirection: "row",
        gap: "2%",
        borderRadius: "10px",
        p: "1rem",
        boxShadow: 20,
        flexGrow: 1,
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
                width: "90px", // adjust the size as needed
                height: "90px", // adjust the size as needed
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
            m: "0 1rem",
          }}
        >
          <Typography variant="p" color="text.secondary">
            <Location /> {props?.address?.street}, {props?.address?.city},{" "}
            {props?.address?.province}, {props?.address?.zipcode} <CopyIcon />
          </Typography>
          <Typography variant="p" color="text.secondary">
            <Clock /> Everyday: 5 pm - 10 pm
          </Typography>
          <Typography variant="p" color="text.secondary">
            <Phone /> {props?.phone}
          </Typography>
          <Typography variant="p" color="text.secondary">
            <URL /> {props?.website}
          </Typography>
        </Box>
      </Box>
      <img
        src={props?.menu}
        alt="new"
        width="200px"
        height="200px"
        style={{ borderRadius: "10px" }}
      />
    </Box>
  );
};

export default SCRestaurantCard;
