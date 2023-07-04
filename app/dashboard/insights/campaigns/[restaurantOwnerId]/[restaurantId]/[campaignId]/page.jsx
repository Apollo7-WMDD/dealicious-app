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
  const { campaignId } = params;
  const campaignData = await fetchCampaign(campaignId);
  const campaign = campaignData.singleCampaign;
  const spendingTotal = campaign.spendings.reduce((accumulator, spending) => {
    return accumulator + spending.billamount;
  }, 0);

  return (
    <div>
      <h1>Campaign: {campaign.name}</h1>
      <h2>Start Date: {campaign.startDate}</h2>
      <h2>End Date: {campaign.endDate}</h2>
      <h2>Total Spendings: {spendingTotal}</h2>
    </div>
  );
};

export default Page;
