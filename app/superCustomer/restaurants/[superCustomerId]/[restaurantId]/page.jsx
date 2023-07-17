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
          flexDirection: "row",
          gap: "3%",
          m: "1rem",
          p: 0,
        }}
      >
        <SCRestaurantCard {...restaurantData.restaurant} />
        <PointsEarned props={restaurantData.points}></PointsEarned>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          m: "1rem",
          p: 0,
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            borderRadius: "10px",
            boxShadow: 20,
          }}
        >
          <Share />
        </Box>
        <Box>
          {!restaurantData.campaigns ? (
            <Typography>Loading...</Typography>
          ) : (
            restaurantData.campaigns.map((item, index) => (
              <CampaignCard key={index} props={item} />
            ))
          )}
        </Box>
      </Box>
      <SCFooter />
    </>
  );
};

export default Page;
