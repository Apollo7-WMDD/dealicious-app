import Link from "next/link";

const fetchInsightsOverview = async (restaurantOwnerId, restaurantId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/dashboard/insights/overview/${restaurantOwnerId}/${restaurantId}`
    // {
    //   cache: "no-store",
    // }
  );

  if (!res.ok) throw new Error(res.text());

  const data = await res.json();
  return data;
};
const Page = async ({ params }) => {
  const { restaurantOwnerId, restaurantId } = params;
  const spendingsData = await fetchInsightsOverview(
    restaurantOwnerId,
    restaurantId
  );
  console.log(spendingsData);

  return (
    <>
      <h1>Overview Insights for All Campaigns of 1 restaurant</h1>
      <Link href={`/dashboard/campaigns/active/${restaurantOwnerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Dashboard
        </button>
      </Link>
      <Link
        href={`/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId}`}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Insights - Campaigns
        </button>
      </Link>
      <Link
        href={`/dashboard/insights/customers/${restaurantOwnerId}/${restaurantId}`}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Insights - Customers
        </button>
      </Link>
    </>
  );
};

export default Page;
