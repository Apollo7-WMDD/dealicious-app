import Link from "next/link";

const Page = ({ params }) => {
  const { restaurantOwnerId } = params;

  // retrieve restaurant owner id from URL path
  return (
    <>
      <div>Active Campaigns</div>
      <div>Restaurant Owner - Active Campaigns</div>
      <h1>{restaurantOwnerId}</h1>
      <Link href={`/profile/${restaurantOwnerId}`}>
        <button>Profile</button>
      </Link>
      <Link href={`/campaigns/createNew/${restaurantOwnerId}`}>
        <button>Create a campaign</button>
      </Link>
      <Link href={`/insights/overview/${restaurantOwnerId}/restaurantId`}>
        <button>Insights - Overview</button>
      </Link>
      <Link href={`/insights/campaigns/${restaurantOwnerId}/restaurantId`}>
        <button>Insights - Campaigns</button>
      </Link>
      <Link href={`/insights/customers/${restaurantOwnerId}/restaurantId`}>
        <button>Insights - Customers</button>
      </Link>
    </>
  );
};

export default Page;
