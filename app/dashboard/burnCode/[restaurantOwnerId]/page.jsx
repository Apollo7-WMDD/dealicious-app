import Link from "next/link";
import React from "react";

const Page = ({ params }) => {
  const { restaurantOwnerId } = params;
  return (
    <>
      <h1>Burn a Code from all the users that sent their requests</h1>
      <Link href={`/dashboard/campaigns/active/${restaurantOwnerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Dashboard
        </button>
      </Link>
    </>
  );
};

export default Page;
