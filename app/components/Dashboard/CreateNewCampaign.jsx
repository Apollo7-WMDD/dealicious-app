"use client";
import Link from "next/link";

import { useContext } from "react";
import { UserTypeContext } from "@/app/context/UserTypeContext";

const CreateNewCampaign = () => {
  const { user } = useContext(UserTypeContext);

  return (
    <Link href={`/dashboard/campaigns/createNew/${user?.restaurantOwnerId}`}>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
        Create campaign
      </button>
    </Link>
  );
};

export default CreateNewCampaign;
