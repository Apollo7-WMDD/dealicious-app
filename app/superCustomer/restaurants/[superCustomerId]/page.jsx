"use client";

// next js imports
import Link from "next/link";

import Header from "../../../components/Header/Header";
import SCCard from "../../../components/Card/SCCard";

import SCHeader from "../../../components/Header/SCHeader"
import SCFooter from "../../../components/Footer/SCFooter"
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const fetchRestaurants = async (superCustomerId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/superCustomer/restaurants/${superCustomerId}`,
    {
      cache: "no-store",
    }
  );

// material-ui imports
import { Box, Button } from "@mui/material";

// theme import
import { useTheme } from "@mui/material";

// react imports
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const theme = useTheme();
  const [restaurants, setRestaurants] = useState([]);
  const { superCustomerId } = params;

  const data = await fetchRestaurants(superCustomerId);
  // console.log(data);
  const cards = data.map((item, index) => <SCCard key={index} props={{ ...item, superCustomerId }} />);


  return (
    <Box>
      <SCHeader />
      <Box
        sx={{

          p:0,
          m:'1rem',
        }}
      >
        <Typography variant="h1" style={{ padding: '0 0 1rem 0' }}>My Restaurants</Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "3%",
          }}
        >
          {restaurants.map((item, index) => (
            <SCCard key={index} props={item} />
          ))}
        </Box>
      </Box>
      <SCFooter />
    </Box>

  );
};

export default Page;
