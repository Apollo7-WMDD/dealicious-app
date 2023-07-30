"use client";
import SCRestaurantCard from "@/app/components/SuperCustomer/SCRestaurantCard";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/context/user_context/store";
import { fetchRestaurantCard } from "@/lib/fetching/profile/data";
import { Box } from "@mui/material";
import LoginComponent from "@/app/components/Login/Login";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = (params) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { restaurantId } = params.params;
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    console.log("Session:", session);
    console.log("Status:", status);
    if (status === "authenticated" && session?.user) {
      router.push(`/superCustomer/restaurants/${session.user.id}`);
    }
  }, [session, status]);

  useEffect(() => {
    const getRestaurantData = async () => {
      console.log(restaurantId);
      const data = await fetchRestaurantCard(restaurantId);
      const { restaurantInfo } = data;
      setRestaurantData(restaurantInfo);
    };
    getRestaurantData();
  }, [restaurantId]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "start",
          gap: 3,
          m: 5,
        }}
      >
        <SCRestaurantCard {...restaurantData} />
        <LoginComponent />
      </Box>
    </>
  );
};

export default Page;
