"use client";

import Header from "../../../components/Header/Header";
import SCCard from "../../../components/Card/SCCard";
import SCHeader from "../../../components/Header/SCHeader";
import SCFooter from "../../../components/Footer/SCFooter";
import { Box } from "@mui/material";

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

  if (!res.ok) throw new Error("Something went wrong...");

  const data = await res.json();
  return data;
};

const Page = async ({ params }) => {
  const { superCustomerId } = params;
  const data = await fetchRestaurants(superCustomerId);
  console.log("this is the data: ", data);

  return (
    <Box>
      <SCHeader />
      <Box
        sx={{
          p: "3%",
        }}
      >
        <Header props={"My Restaurants"} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "3%",
          }}
        >
          {data.map((item, index) => (
            <SCCard key={index} props={item} />
          ))}
        </Box>
      </Box>
      <SCFooter />
    </Box>
  );
};

export default Page;
