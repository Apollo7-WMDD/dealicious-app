"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();
  const user = {
    restaurantId: "649be44234ccc8cbad46d38c",
  };

  return (
    // create a simple sidebar with a list of links with tailwindcss
    <div className="bg-gray-800 text-gray-100 flex justify-center flex-col min-h-full">
      <div className="flex justify-center items-center h-16 border-b border-gray-700">
        <Link href={`/`}>
          <span className="text-2xl font-bold">Dealicious</span>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <ul className="flex flex-col items-center justify-center">
          <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">
            <Link href={`/dashboard/campaigns/active/${session?.user.id}`}>
              Campaigns Active
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">
            <Link
              href={`/dashboard/insights/overview/${session?.user.id}/${user.restaurantId}`}
            >
              Insights - Overview
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">
            <Link
              href={`/dashboard/insights/campaigns/${session?.user.id}/${user.restaurantId}`}
            >
              Insights - Campaigns
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">
            {" "}
            <Link
              href={`/dashboard/insights/customers/${session?.user.id}/${user.restaurantId}`}
            >
              Insights - Customers
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">
            <a href={`/dashboard/burnCode/${session?.user.id}`}>Burn a Code</a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">
            <Link href={`/dashboard/profile/${session?.user.id}`}>Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
