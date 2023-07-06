import Link from "next/link";

const fetchCampaigns = async (restaurantId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/dashboard/insights/campaigns/${restaurantId}`
  );

  if (!res.ok) throw new Error(res.text());

  const data = await res.json();
  return data;
};

const Page = async ({ params }) => {
  const { restaurantOwnerId, restaurantId } = params;
  const campaignsData = await fetchCampaigns(restaurantId);

  console.log(campaignsData);
  const campaignSingleId = campaignsData[0]._id;

  return (
    <>
      <h1>Insights of every Campaign (as a list)</h1>
      <Link
        href={`/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId}/${campaignSingleId}`}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Insights - Single Campaign (example)
        </button>
      </Link>
      <Link
        href={`/dashboard/insights/overview/${restaurantOwnerId}/${restaurantId}`}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Insights - Overview
        </button>
      </Link>
      <Link
        href={`/dashboard/insights/overview/${restaurantOwnerId}/${restaurantId}`}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Insights - Customers
        </button>
      </Link>
    </>
  );
};

export default Page;
