"use client";
import Link from "next/link";
import { Button, Box } from "@mui/material";
import CreateNewCampaign from "../../../../components/Dashboard/CreateNewCampaign";
import Header from "../../../../components/Header/Header";
import SubHeader from "../../../../components/Header/SubHeader";
import { useStore as useStoreOwner } from "@/lib/context/user_context/store";

const Page = () => {
  const { restaurantOwnerId, restaurantId, setRestaurantId } = useStoreOwner();

  return (
    <div style={{ padding: "0 2%" }}>
      {/* <div className="flex justify-between "> */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Header props={"Campaigns"} />
          <SubHeader props={"Upcoming campaigns"} />

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

          <Link href={`/dashboard/burnCode/codes/${restaurantOwnerId}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
              Burn Code
            </button>
          </Link>
          <Button>Home Page</Button>
        </div>
        <CreateNewCampaign className="m-5" />
        {/* </div> */}
      </Box>
    </div>
  );
};

export default Page;
