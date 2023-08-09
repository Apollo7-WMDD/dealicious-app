import ChartCard from "../Card/ChartCard";
import SubHeader from "../Header/SubHeader";
import { Box, useTheme } from "@mui/material";

import { useState, useEffect } from "react";
import { fetchImagesMenus } from "@/lib/fetching/profile/data";

function ImagesMenus({ restaurantOwnerId,data}) {
  // const [restaurantData, setRestaurantData] = useState(null);

  // useEffect(() => {
  //   const getRestaurantData = async () => {
  //     const data = await fetchImagesMenus(restaurantOwnerId);
  //     const { restaurantInfo } = data;
  //     setRestaurantData(restaurantInfo);
  //   };
  //   getRestaurantData();
  // }, [restaurantOwnerId]);

  const restaurantData = data;
  const theme = useTheme();
  const shadowColor = `${theme.palette.neutral[20]}1f`;

  return (
    <Box sx={{
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
    }}>
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
                marginTop:"33px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: "19px",
              }}
            >
              <img
                src={restaurantData?.restaurantInfo?.logo}
                alt="Logo"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <img
                src={restaurantData?.restaurantInfo?.menu}
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
    </Box>
  );
}

export default ImagesMenus;
