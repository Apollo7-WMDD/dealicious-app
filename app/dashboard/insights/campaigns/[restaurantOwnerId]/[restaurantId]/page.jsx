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
  const campaigns = campaignsData.campaigns;
  const spendings = campaignsData.spending;

  return (
    <>
      <h1>Insights of every Campaign (as a list)</h1>
      {campaigns.map((campaign) => {
        const campaignSpendings = spendings.filter(
          (spending) => spending.campaignId === campaign._id
        );

        return (
          <div key={campaign._id}>
            <Link
              href={`/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId}/${campaign._id}`}
              style={{ display: "block" }}
            >
              <button>{campaign.name}</button>
            </Link>
            {campaignSpendings.map((spending) => (
              <h1 key={spending._id}>{spending.billamount}</h1>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default Page;
