import Link from "next/link";

const fetchCustomerInsights = async (restaurantId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/dashboard/insights/customers/${restaurantId}`
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
  const insightsCustomers = await fetchCustomerInsights(restaurantId);
  console.log(insightsCustomers);

  return (
    <>
      <div className="block m-4">
        <h1 className="text-2xl font-bold">Insights - Customers</h1>
        <Link
          href={`/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId}`}
        >
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
            Insights - Campaigns
          </button>
        </Link>
        <Link
          href={`/dashboard/insights/overview/${restaurantOwnerId}/${restaurantId}`}
        >
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
            Insights - Overview
          </button>
        </Link>
      </div>
    </>
  );
};

export default Page;
