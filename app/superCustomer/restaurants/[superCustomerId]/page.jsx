"use client";

// next js imports
import Link from "next/link";

import Header from "@/app/components/Header/Header";
import SCCard from "@/app/components/Card/SCCard";
import SCHeader from "@/app/components/Header/SCHeader";
import SCFooter from "@/app/components/Footer/SCFooter";

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

  console.log(restaurants);

  useEffect(() => {
    const fetchRestaurants = async (superCustomerId) => {
      const isProduction = process.env.NODE_ENV === "production";
      const serverUrl = isProduction
        ? process.env.NEXT_PUBLIC_SERVER_URL
        : "http://localhost:3000";

      const res = await fetch(
        `${serverUrl}/api/superCustomer/restaurants/${superCustomerId}`
      );

      if (!res.ok) throw new Error("Something went wrong...");

      const data = await res.json();
      setRestaurants(data);
    };

    fetchRestaurants(superCustomerId);
  }, [superCustomerId]);

  return (
    <Box>
      <SCHeader />
      <Box
        sx={{
          p: "3%",
        }}
      >
        <Header props={"My Restaurants"} />
        <Link href={`/home/superCustomer`}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary[80],
              marginTop: "20px",
              marginRight: "20px",
              ":hover": {
                backgroundColor: "white",
                color: theme.palette.primary[80],
              },
            }}
          >
            Home
          </Button>
        </Link>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "3%",
          }}
        >
          {restaurants.map((item, index) => (
            <SCCard
              key={index}
              props={item}
              superCustomerId={superCustomerId}
            />
          ))}
        </Box>
      </Box>
      <SCFooter />
    </Box>
  );
};

export default Page;
