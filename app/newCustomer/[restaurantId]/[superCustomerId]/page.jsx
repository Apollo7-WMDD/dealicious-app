"use client";
import SCRestaurantCard from "@/app/components/SuperCustomer/SCRestaurantCard";
import NCHeader from "@/app/components/Header/NCHeader";
import SCFooter from "@/app/components/Footer/SCFooter";
import CampaignCard from "@/app/components/SuperCustomer/CampaignCard";
import NewCustomer from "@/app/components/NewCustomer/NewCustomer";
import Loader from "@/app/components/Loader";
import { Box, useTheme, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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
          `/api/superCustomer/newCustomer/${superCustomerId}/${restaurantId}`,
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
      <NCHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          m: "1rem auto",
          p: "1rem 2rem",

          "@media screen and (min-width:800px)": {
            display: "grid",
            gridTemplateColumns:'1fr 2fr',
            maxWidth:'1400px',
          }
        }}
      >
        <NewCustomer 
          props={restaurantData?.user}></NewCustomer>
        <SCRestaurantCard 
        {...restaurantData?.restaurant} />        
      </Box>
      <Box
        sx={{
          m: "0 auto",
          p: "1rem 2rem 1rem 1rem",
          borderRadius: "10px",
          // boxShadow: `0px 4px 20px 0px ${shadowColor}`,
          maxWidth: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          // maxWidth:'324px',
          maxHeight: "551px",
          alignItems: isLoading ? "center" : undefined,
          justifyContent: isLoading ? "center" : undefined,
          maxWidth:'1400px',
        }}
      >
        <Typography
          sx={{
            m:'0 1rem',
          }}
          variant="h3"
        >
          Ongoing campaigns, exclusively for you
        </Typography>
        <Box
          sx={{
            display: "grid",
            // m: "0 1rem",
            p: "1rem",
            gap: "1rem",
            overflow: "auto",
            "@media screen and (min-width:800px)": {
              gridTemplateColumns: "1fr 1fr 1fr",
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
              <CampaignCard
                key={index}
                props={item}
              />
            ))
          )}
        </Box>
      </Box>
      <SCFooter />
    </>
  );
};

export default Page;