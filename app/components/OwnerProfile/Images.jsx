import ChartCard from "../Card/ChartCard";
import SubHeader from "../Header/SubHeader";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

import { useState, useEffect } from "react";
import LoaderSkeleton from "./Loader/LoaderSkeleton";
import { fetchImagesMenus } from "@/lib/fetching/profile/data";

function ImagesMenus({ restaurantOwnerId }) {
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const getRestaurantData = async () => {
      const data = await fetchImagesMenus(restaurantOwnerId);
      const { restaurantInfo } = data;
      setRestaurantData(restaurantInfo);
    };
    getRestaurantData();
  }, [restaurantOwnerId]);

  return (
    <ChartCard content="Images & Menus" gridColumn="1 / 3">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <SubHeader>Images & Menus</SubHeader>
        <Typography>
          {!restaurantData ? <LoaderSkeleton /> : restaurantData?.menu}
        </Typography>
        <Typography>
          {!restaurantData ? <LoaderSkeleton /> : restaurantData?.logo}
        </Typography>
      </Box>
    </ChartCard>
  );
}

export default ImagesMenus;
