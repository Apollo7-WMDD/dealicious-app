import Link from "next/link";
import React from "react";

const Page = ({ params }) => {
  const { restaurantOwnerId } = params;
  return (
    <>
      <h1>Insights of every Campaign (as a list)</h1>
      <Link
        href={`/insights/campaigns/${restaurantOwnerId}/restaurantId/campaignId`}
      >
        <button>Insights - Campaign Individual</button>
      </Link>
    </>
  );
};

export default Page;
