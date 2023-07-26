"use client";

import Link from "next/link";
import Image from "next/image";
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
          m: "2rem",
          p: 0,

          "@media screen and (min-width:800px)": {
            display: "grid",
            gridTemplateColumns:'1fr 2fr',
            // gridColumn: '1fr 2fr,'
            // gridAutoColumns:'1fr 2fr'
            // flexDirection: "row",
          },
        }}
      >
        <NewCustomer 
          // sx={{
          //   "@media screen and (min-width:800px)": {
          //     flexGrow: 1,
          //     flexShrink: 0,
          //   },
          // }}        
          props={restaurantData?.user}></NewCustomer>
        <SCRestaurantCard 
          // sx={{
          //   "@media screen and (min-width:800px)": {
          //     flexGrow: 2,
          //     flexShrink: 1,
          //   },
          // }} 
        {...restaurantData?.restaurant} />        
      </Box>
      <Box
        sx={{
          m: "2rem",
          p: "1rem",
          borderRadius: "10px",
          boxShadow: `0px 4px 20px 0px ${shadowColor}`,
          maxWidth: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          // maxWidth:'324px',
          maxHeight: "551px",
          alignItems: isLoading ? "center" : undefined,
          justifyContent: isLoading ? "center" : undefined,
        }}
      >
        <Typography
          sx={{
            p: "0 2rem",
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
      {/* <Box>
        {!restaurantData ? (
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
          restaurantData?.campaigns?.map((item, index) => (
            <CampaignCard key={index} props={item} />
          ))
        )}
      </Box> */}
      <SCFooter />
    </>
  );
};

export default Page;
// import Link from "next/link";

// const fetchRestaurant = async (restaurantId, superCustomerId) => {
//   const isProduction = process.env.NODE_ENV === "production";
//   const serverUrl = isProduction
//     ? process.env.NEXT_PUBLIC_SERVER_URL
//     : "http://localhost:3000";

//   const res = await fetch(
//     `${serverUrl}/api/newCustomer/${restaurantId}/${superCustomerId}`
//     // {
//     //   cache: "no-store",
//     // }
//   );

//   if (!res.ok) throw new Error("Something went wrong...");

//   const data = await res.json();
//   return data;
// };

// const Page = async ({ params }) => {
//   const { restaurantId, superCustomerId } = params;
//   const restaurantData = await fetchRestaurant(restaurantId, superCustomerId);
//   console.log(restaurantData);

//   return (
//     <>
//       <h1>
//         New Customer page that shows all the Campaigns of a restaurant that a
//         Super Customer shared his special link with you from that specific
//         restaurant
//       </h1>
//       <Link href={`/home/${restaurantId}`}>
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
//           Home - Restaurant
//         </button>
//       </Link>
//     </>
//   );
// };

// export default Page;
