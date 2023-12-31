"use client";

import SCRestaurantCard from "../../../../components/SuperCustomer/SCRestaurantCard";
import SCHeader from "../../../../components/Header/SCHeader";
import SCFooter from "../../../../components/Footer/SCFooter";
import PointsEarned from "../../../../components/SuperCustomer/PointsEarned";
import Share from "../../../../components/SuperCustomer/Share";
import CampaignCard from "@/app/components/SuperCustomer/CampaignCard";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "@/app/components/Loader";

const Page = ({ params }) => {
  const theme = useTheme();
  const shadowColor = `${theme.palette.neutral[20]}1f`;

  const { superCustomerId, restaurantId } = params;
  const [restaurantData, setRestaurantData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async (superCustomerId, restaurantId) => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/superCustomer/singleRestaurant/${superCustomerId}/${restaurantId}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) throw new Error("Something went wrong...");

        const data = await res.json();
        setRestaurantData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRestaurants(superCustomerId, restaurantId);
  }, [superCustomerId, restaurantId]);

  return (
    <>
      <SCHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          m: "1rem auto",
          p: "1rem 2rem",

          "@media screen and (min-width:800px)": {
            display: "flex",
            flexDirection: "row",
            maxWidth:'1400px',
          },
        }}
      >
        {!restaurantData.restaurant ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Loader />
          </div>
          ):(
            <SCRestaurantCard {...restaurantData.restaurant} />
          ) }
        <PointsEarned props={restaurantData.points}></PointsEarned>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          m: "2rem auto 1rem auto",
          p: "0 2rem",
          gap: "1rem",

          "@media screen and (min-width:800px)": {
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            height: "551px",
            maxWidth:'1400px',
            
          },
        }}
      >
        <Share
          sx={{
            maxHeight: "551px",
            p: "64px 26px",
          }}
          superCustomerId={superCustomerId}
          restaurantId={restaurantId}
          restaurantData={restaurantData.restaurant}
        />
        <Box
          sx={{
            maxWidth: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxHeight: "551px",
            alignItems: isLoading ? "center" : undefined,
            justifyContent: isLoading ? "center" : undefined,
          }}
        >
          <Typography
            sx={{
              m:'0 2rem',
            }}
            variant="h3"
          >
            Ongoing campaigns, exclusively for you
          </Typography>
          <Box
            sx={{
              display: "grid",
              m: "0 1rem",
              p: "1rem",
              gap: "1rem",
              overflow: "auto",
              "@media screen and (min-width:800px)": {
                gridTemplateColumns: "1fr 1fr",
              },
            }}
          >
            {!restaurantData.campaigns ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Loader />
              </div>
            ) : (
              restaurantData.campaigns.map((item, index) => (
                <CampaignCard key={index} props={item} />
              ))
            )}
          </Box>
        </Box>
      </Box>
      <SCFooter />
    </>
  );
};

export default Page;
