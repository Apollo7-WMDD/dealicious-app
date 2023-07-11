"use client";

import { useEffect } from "react";

import Link from "next/link";
import { Button, Box } from "@mui/material";

import CreateNewCampaign from "@/app/components/Dashboard/CreateNewCampaign";
import Header from "@/app/components/Header/Header";
import SubHeader from "@/app/components/Header/SubHeader";

// user context
import { useStore } from "@/lib/context/user_context/store";

const fetchRestaurants = async (restaurantOwnerId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/dashboard/campaigns/active/${restaurantOwnerId}`
  );

  if (!res.ok) throw new Error("Something went wrong...");

  const data = await res.json();
  return data;
};

const Page = async () => {
  const { restaurantOwnerId, restaurantId, setRestaurantId } = useStore();

  useEffect(() => {
    const getRestaurantId = async () => {
      const data = await fetchRestaurants(restaurantOwnerId);
      setRestaurantId(data.restaurantId);
    };
    getRestaurantId();
  }, [restaurantOwnerId]);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Header props={"Campaigns"} />
          <SubHeader props={"Ongoing campaigns"} />

          <Link href={`/`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
              Home Page
            </button>
          </Link>
          <Link href={`/dashboard/campaigns/createNew/${restaurantOwnerId}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
              Create campaign
            </button>
          </Link>

          <Link href={`/dashboard/profile/${restaurantOwnerId}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
              Profile
            </button>
          </Link>

          <Link
            href={`/dashboard/insights/overview/${restaurantOwnerId}/${restaurantId}`}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
              Insights - Overview
            </button>
          </Link>

          <Link href={`/dashboard/burnCode/${restaurantOwnerId}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
              Burn Code
            </button>
          </Link>
          <Button>Home Page</Button>
        </div>
        <CreateNewCampaign className="m-5" />
      </Box>
    </div>
  );
};

export default Page;
