import ChartCard from "../Card/ChartCard";
import SubHeader from "../Header/SubHeader";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

//
import { useState, useEffect } from "react";
import LoaderSkeleton from "./Loader/LoaderSkeleton";
import { fetchReferralSystem } from "@/lib/fetching/profile/data";

function Referral({ restaurantOwnerId }) {
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const getRestaurantData = async () => {
      const data = await fetchReferralSystem(restaurantOwnerId);
      const { restaurantInfo } = data;
      setRestaurantData(restaurantInfo);
    };
    getRestaurantData();
  }, [restaurantOwnerId]);

  return (
    <ChartCard content="Referral System" gridColumn="1 / 3">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <SubHeader>Referral System</SubHeader>
        <Typography>
          {!restaurantData ? <LoaderSkeleton /> : restaurantData?.qrCode}
        </Typography>
      </Box>
    </ChartCard>
  );
}

export default Referral;
