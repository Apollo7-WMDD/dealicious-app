"use client";

import Link from "next/link";
import Image from "next/image";
import SCRestaurantCard from "../../../../components/SuperCustomer/SCRestaurantCard";
import SCHeader from "../../../../components/Header/SCHeader";
import SCFooter from "../../../../components/Footer/SCFooter";
import PointsEarned from "../../../../components/SuperCustomer/PointsEarned";
import Share from "../../../../components/SuperCustomer/Share";
import CampaignCard from "@/app/components/SuperCustomer/CampaignCard";
import { Card, CardActions, CardContent, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const { superCustomerId, restaurantId } = params;
  const [restaurantData, setRestaurantData] = useState({});

  useEffect(() => {
    const fetchRestaurants = async (superCustomerId, restaurantId) => {
      const res = await fetch(
        `/api/superCustomer/singleRestaurant/${superCustomerId}/${restaurantId}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) throw new Error("Something went wrong...");

      const data = await res.json();
      setRestaurantData(data);
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
          m: "1rem",
          p: 0,

          "@media screen and (min-width:800px)": {
            display: "flex",
            flexDirection: "row",
          },
        }}
      >
        <SCRestaurantCard {...restaurantData.restaurant} />
        <PointsEarned props={restaurantData.points}></PointsEarned>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          m: "1rem",
          p: 0,
          gap: "1rem",

          "@media screen and (min-width:800px)": {
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
          },
        }}
      >
        <Share
          superCustomerId={superCustomerId}
          restaurantId={restaurantId}
          restaurantData={restaurantData.restaurant}
        />
        <Box
          sx={{
            p: "1rem",
            borderRadius: "10px",
            boxShadow: 10,
            maxWidth: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Typography variant="h3">
            Ongoing campaigns, exclusively for you
          </Typography>
          <Box
            sx={{
              display: "grid",
              m: "1rem",
              p: 0,
              gap: "1rem",

              "@media screen and (min-width:800px)": {
                gridTemplateColumns: "1fr 1fr",
              },
            }}
          >
            {!restaurantData.campaigns ? (
              <Typography>Loading...</Typography>
            ) : (
              restaurantData.campaigns.map((item, index) => (
                <CampaignCard
                  sx={
                    {
                      // flexGrow: '1',
                      // flexShrink: '1',
                      // flexBasis: '100%',
                      // flex: '1 0 40%',
                    }
                  }
                  key={index}
                  props={item}
                />
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
