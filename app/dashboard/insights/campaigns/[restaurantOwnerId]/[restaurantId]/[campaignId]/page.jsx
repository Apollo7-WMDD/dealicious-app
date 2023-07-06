import Link from "next/link";

const fetchCampaign = async (campaignId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/dashboard/insights/singleCampaign/${campaignId}`
  );

  if (!res.ok) throw new Error(res.text());

  const data = await res.json();
  return data;
};

const Page = async ({ params }) => {
  const { restaurantOwnerId, restaurantId, campaignId } = params;
  const campaignData = await fetchCampaign(campaignId);
  console.log(campaignData);

  return (
    <div>
      <h1>Single Campaign Data</h1>
      <Link
        href={`/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId}`}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Insights - Campaigns
        </button>
      </Link>
    </div>
  );
};

export default Page;
