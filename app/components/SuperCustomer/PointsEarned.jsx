"use client";
import React from "react";
import StarPerson from "@/app/components/svg/starPerson.svg";
import { Box, Typography, useTheme } from "@mui/material";
import SCRedeemBtn from "../../components/Button/SCRedeemBtn";

const PointsEarned = ({ props }) => {
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
        borderRadius: "10px",
        boxShadow: `0px 4px 20px 0px ${shadowColor}`,
        p: "1rem",
      }}
    >
      <Typography variant="h2" style={{ textAlign: "start" }}>
        Points Earned
      </Typography>
      <Typography variant="p">
        Keep earning points to get a rewards or redeem points and get discounts!
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          m: "auto",
        }}
      >
        <StarPerson
          width={60}
          height={60}
          style={
            {
              // margin: "1rem auto 1rem 1rem",
            }
          }
        />
        <Typography variant="h1">{props}</Typography>
      </Box>
      <Typography variant="p">*20 points = $2</Typography>
      <Box style={{ textAlign: "end" }}>
        <SCRedeemBtn text="Redeem Points" width="200px" />
      </Box>
    </Box>
  );
};

export default PointsEarned;
