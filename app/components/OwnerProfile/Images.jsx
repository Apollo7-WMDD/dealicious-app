import ChartCard from "../Card/ChartCard";
import SubHeader from "../Header/SubHeader";
import { Box } from "@mui/material";

import { useState, useEffect } from "react";
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
          alignItems: "start",
        }}
      >
        <SubHeader>Images & Menus</SubHeader>
        {!restaurantData ? null : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: "19px",
              }}
            >
              {/* <Typography variant="body1">Logo Image:</Typography> */}
              <img
                src={restaurantData?.logo}
                alt="Logo"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <img
                src={restaurantData?.menu}
                alt="Menu"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Box>
          </>
        )}
      </Box>
    </ChartCard>
  );
}

export default ImagesMenus;
