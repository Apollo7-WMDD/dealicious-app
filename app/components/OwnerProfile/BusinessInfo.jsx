import { useState, useEffect } from "react";
import ChartCard from "../Card/ChartCard";
import SubHeader from "../Header/SubHeader";
import { Box } from "@mui/material";
import Label from "../Profile/Label";
import InputValue from "../Profile/InputValue";

// fetch imports
import { fetchBusinessInfo } from "@/lib/fetching/profile/data";
import LoaderSkeleton from "./Loader/LoaderSkeleton";

function BusinessInfo({ restaurantOwnerId }) {
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const getRestaurantData = async () => {
      const data = await fetchBusinessInfo(restaurantOwnerId);
      const { restaurantInfo } = data;
      setRestaurantData(restaurantInfo);
    };
    getRestaurantData();
  }, [restaurantOwnerId]);

  return restaurantData ? (
    <ChartCard content="Business Hours" gridColumn="1 / 3">
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
          <InputValue text={restaurantData?.name} />
        </Box>
        <Box sx={{ marginTop: "24px" }}>
          <Label text="Business Category" />
          <InputValue text={restaurantData?.category} />
        </Box>
        <Box sx={{ marginTop: "24px" }}>
          <Label text="Manager" />
          <InputValue text={restaurantData?.manager} />
        </Box>
        <Box sx={{ marginTop: "24px" }}>
          <Label text="Website" />
          <InputValue text={restaurantData?.website} />
        </Box>
        <Box sx={{ marginTop: "24px" }}>
          <Label text="Business Email Address" />
          <InputValue text={restaurantData?.email} />
        </Box>
        <Box sx={{ marginTop: "24px" }}>
          <Label text="Postal Code" />
          <InputValue text={restaurantData?.address.postalCode} />
        </Box>
        <Box sx={{ marginTop: "24px" }}>
          <Label text="Street Address" />
          <InputValue text={restaurantData?.address.street} />
        </Box>
        <Box sx={{ marginTop: "24px" }}>
          <Label text="Phone Number" />
          <InputValue text={restaurantData?.phone.toString()} />
        </Box>
      </Box>
    </ChartCard>
  ) : (
    <LoaderSkeleton />
  );
  // );
}

export default BusinessInfo;
