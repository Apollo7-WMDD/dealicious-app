import ChartCard from "../Card/ChartCard";
import SubHeader from "../Header/SubHeader";
import { Box, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

// react
import { useEffect, useState } from "react";

// fetch imports
import { fetchBusinessHours } from "@/lib/fetching/profile/data";

function BusinessHours({ restaurantOwnerId, data }) {
  // const [restaurantData, setRestaurantData] = useState(null);

  // useEffect(() => {
  //   const getRestaurantData = async () => {
  //     const data = await fetchBusinessHours(restaurantOwnerId);
  //     const { restaurantInfo } = data;
  //     setRestaurantData(restaurantInfo);
  //   };
  //   getRestaurantData();
  // }, [restaurantOwnerId]);
  const restaurantData = data;

  const theme = useTheme();
  const shadowColor = `${theme.palette.neutral[20]}1f`;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Box sx={{
      gridColumn: "1/3",
      boxShadow: `0px 4px 20px 0px ${shadowColor}`,
      borderRadius: "8px",
      display: "flex",
      padding: "16px 24px",
      flexDirection: "column",
      justifyContent: "space-between",
      // alignItems: "start",
      flexShrink: 0,
      gap: "1rem",
      height: "100%",
      width: "100%",
      [theme.breakpoints.down("md")]: {
        gridColumn: "1/-1",
      },
    }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <SubHeader>Business Hours</SubHeader>
        <Typography>
          {!restaurantData
            ? null
            : Object.keys(restaurantData?.restaurantInfo?.businessHours).map((day) => (
                <Box
                  key={restaurantData?.restaurantInfo?.businessHours[day]._id}
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Mukta",
                      fontSize: "18px",
                      fontStyle: "normal",
                      fontWeight: 600,
                    }}
                  >
                    {capitalizeFirstLetter(day)}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Mukta",
                      fontSize: "18px",
                      fontStyle: "normal",
                      fontWeight: 600,
                    }}
                  >
                    {restaurantData?.restaurantInfo?.businessHours[day].open} AM - {restaurantData?.restaurantInfo?.businessHours[day].close} PM
                  </Typography>
                </Box>
              ))}
        </Typography>
      </Box>
    </Box>
  );
}

export default BusinessHours;
