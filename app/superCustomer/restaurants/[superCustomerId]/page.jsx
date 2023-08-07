"use client";

import Header from "@/app/components/Header/Header";
import SCCard from "@/app/components/Card/SCCard";
import SCHeader from "@/app/components/Header/SCHeader";
import SCFooter from "@/app/components/Footer/SCFooter";
import Loader from "@/app/components/Loader";

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

  useEffect(() => {
    const fetchRestaurants = async (superCustomerId) => {
      const res = await fetch(
        `/api/superCustomer/restaurants/${superCustomerId}`
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
          p: "2rem",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <Header props={"My Restaurants"} />
        <Box
          sx={{
            display:'grid',
            gap:'1rem',
            gridTemplateColumns: "1fr",
            alignItems: "center",
            margin: '4rem auto',
            justifyItems: 'center',
            alignItems: 'center',
            
            "@media screen and (min-width:800px)": {
              gridTemplateColumns: "1fr 1fr",
            },
            "@media screen and (min-width:1000px)": {
              gridTemplateColumns: "1fr 1fr 1fr",
            },
            "@media screen and (min-width:1200px)": {
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
            },
          }}
        >
          {!restaurants ? (
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
            restaurants.map((item, index) => (
              <SCCard
                key={index}
                props={item}
                superCustomerId={superCustomerId}
              />
            ))
          )}
        </Box>
      </Box>
      <SCFooter
        sx={{
          bottom: 0,
          position: "fixed",
          width: "100%",
          left: 0,
          bottom: 0,
          right: 0,
          zindex: 1000,
        }}
      />
    </Box>
  );
};

export default Page;
