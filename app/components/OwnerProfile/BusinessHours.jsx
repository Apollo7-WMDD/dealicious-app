import ChartCard from "../Card/ChartCard";
import SubHeader from "../Header/SubHeader";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

// react
import { useEffect, useState } from "react";

// fetch imports
import { fetchBusinessHours } from "@/lib/fetching/profile/data";
import LoaderSkeleton from "./Loader/LoaderSkeleton";

function BusinessHours({ restaurantOwnerId }) {
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const getRestaurantData = async () => {
      const data = await fetchBusinessHours(restaurantOwnerId);
      const { restaurantInfo } = data;
      setRestaurantData(restaurantInfo);
    };
    getRestaurantData();
  }, [restaurantOwnerId]);

  console.log("This is the bsuiness hours", restaurantData);

  return (
    <ChartCard content="Business Hours" gridColumn="1 / 3">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <SubHeader>Business Hours</SubHeader>
        <Typography>
          {!restaurantData ? (
            <LoaderSkeleton />
          ) : (
            Object.keys(restaurantData?.businessHours).map((day) => (
              <Box
                sx={{ marginTop: "24px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}
                key={restaurantData?.businessHours[day]._id}
              >
                <Typography>{day}</Typography>
                <Typography>
                  {restaurantData?.businessHours[day].open} - {restaurantData?.businessHours[day].close}
                </Typography>
              </Box>
            ))
          )}
        </Typography>
      </Box>
    </ChartCard>
  );
}

export default BusinessHours;
