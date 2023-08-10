import { useState, useEffect } from "react";
import ChartCard from "../Card/ChartCard";
import SubHeader from "../Header/SubHeader";
import { Box, useTheme } from "@mui/material";
import Label from "../Profile/Label";
import InputValue from "../Profile/InputValue";

// fetch imports
import { fetchBusinessInfo } from "@/lib/fetching/profile/data";

function BusinessInfo({ restaurantOwnerId, data }) {
  const restaurantData = data;
  const theme = useTheme();
  const shadowColor = `${theme.palette.neutral[20]}1f`;

  return restaurantData ? (
    <Box
      sx={{
        gridColumn: "1/3",
        boxShadow: `0px 4px 20px 0px ${shadowColor}`,
        borderRadius: "8px",
        display: "flex",
        padding: "16px 24px",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "start",
        flexShrink: 0,
        gap: "1rem",
        height: "100%",
        [theme.breakpoints.down("md")]: {
          gridColumn: "1/-1",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <SubHeader>Business Information</SubHeader>
        <Box sx={{ marginTop: "24px" }}>
          <Label text="Business Name" />
          <InputValue text={restaurantData?.restaurantInfo?.name} />
        </Box>
        <Box sx={{ marginTop: "24px" }}>
          <Label text="Business Category" />
          <InputValue text={restaurantData?.restaurantInfo?.category} />
        </Box>
        <Box sx={{ marginTop: "24px" }}>
          <Label text="Manager" />
          <InputValue text={restaurantData?.restaurantInfo?.manager} />
        </Box>
        <Box sx={{ marginTop: "24px" }}>
          <Label text="Website" />
          <InputValue text={restaurantData?.restaurantInfo?.website} />
        </Box>
        <Box sx={{ marginTop: "24px" }}>
          <Label text="Business Email Address" />
          <InputValue text={restaurantData?.restaurantInfo?.email} />
        </Box>
        <Box sx={{ marginTop: "24px" }}>
          <Label text="Postal Code" />
          <InputValue
            text={restaurantData?.restaurantInfo?.address?.postalCode}
          />
        </Box>
        <Box sx={{ marginTop: "24px" }}>
          <Label text="Street Address" />
          <InputValue text={restaurantData?.restaurantInfo?.address.street} />
        </Box>
        <Box sx={{ marginTop: "24px" }}>
          <Label text="Phone Number" />
          <InputValue text={restaurantData?.restaurantInfo?.phone.toString()} />
        </Box>
      </Box>
    </Box>
  ) : null;
}

export default BusinessInfo;
