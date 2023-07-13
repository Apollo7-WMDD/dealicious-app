"use client";
import Link from "next/link";

import { useContext } from "react";

const CreateNewCampaign = () => {
  return (
    <Link href={`/dashboard/campaigns/createNew/234234234`}>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
        Create campaign
      </button>
    </Link>
  );
};

export default CreateNewCampaign;
