"use client";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { CardContent, Box, Typography, useTheme } from "@mui/material";
import SCShare from "../../components/Button/SCShare";

const Share = ({ props }) => {
  const theme = useTheme();
  const shadowColor = `${theme.palette.neutral[20]}1f`;

  return (
      <Box
        sx={{
          maxWidth: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "3%",
          textAlign: "center",
          justifyContent: "center",
          border: 1,
          borderColor: '#ff5938',          
          borderRadius: "10px",
          boxShadow: `0px 4px 20px 0px ${shadowColor}`,
        }}
      >
        <Box>
            <Typography variant="h2">{props.name}</Typography>
            <Typography variant="p">Invited you to experience culinary bliss. 
            Activate your favourite cmpaign at our place and embark on a remarkable
            culinary adventure unlike any other.</Typography>
        </Box>
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
        {/* <SCShare
          text="Share with friends"
          width="244px"
          superCustomerId={superCustomerId}
          restaurantId={restaurantId}
        /> */}
      </Box>
  );
};

export default Share;
