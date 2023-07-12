"use client";

// react imports
import { useEffect } from "react";

// next imports
import Link from "next/link";

// mui imports
import { Button, Box } from "@mui/material";

// components imports
import CreateNewCampaign from "@/app/components/Dashboard/CreateNewCampaign";
import Header from "@/app/components/Header/Header";
import SubHeader from "@/app/components/Header/SubHeader";

// user context imports
import { useStore } from "@/lib/context/user_context/store";

// fetch imports
import { fetchRestaurantId } from "@/lib/fetching/restaurant/restaurant_id/data";

const Page = () => {
  const { restaurantOwnerId, restaurantId, setRestaurantId } = useStore();

  useEffect(() => {
    const getRestaurantId = async () => {
      const data = await fetchRestaurantId(restaurantOwnerId);
      setRestaurantId(data.restaurantId);
    };

    if (restaurantOwnerId) {
      getRestaurantId();
    }
  }, [restaurantOwnerId]);

  console.log("restaurantOwnerId", restaurantOwnerId);
  console.log("restaurantId", restaurantId);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Header props={"Campaigns"} />
          <SubHeader props={"Ongoing campaigns"} />

          <Link href={`/`}>
            <button>Home Page</button>
          </Link>
          <Link href={`/dashboard/campaigns/createNew/${restaurantOwnerId}`}>
            <button>Create campaign</button>
          </Link>

          <Link href={`/dashboard/profile/${restaurantOwnerId}`}>
            <button>Profile</button>
          </Link>

          <Link
            href={`/dashboard/insights/overview/${restaurantOwnerId}/${restaurantId}`}
          >
            <button>Insights - Overview</button>
          </Link>

          <Link href={`/dashboard/burnCode/${restaurantOwnerId}`}>
            <button>Burn Code</button>
          </Link>
          <Button>Home Page</Button>
        </div>
        <CreateNewCampaign />
      </Box>
    </div>
  );
};

export default Page;
