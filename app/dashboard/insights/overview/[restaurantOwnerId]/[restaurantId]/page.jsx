const fetchSpendings = async (restaurantOwnerId, restaurantId) => {
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

const fetchCampaigns = async (restaurantId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/chartInsights/${restaurantId}`
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
  const spendingsData = fetchSpendings(restaurantOwnerId, restaurantId);

  const campaignsData = fetchCampaigns(restaurantId);

  const [spendings, campaigns] = await Promise.all([
    spendingsData,
    campaignsData,
  ]);

  // this will access the first spending object and get the suggestions
  const suggestions = Object.entries(spendings[0].suggestion);

  return (
    <>
      <h1>Overview Insights for All Campaigns of 1 restaurant</h1>
      {spendings.map((spending) => {
        return (
          <div
            style={{ margin: "1rem", border: "1px solid black" }}
            key={spending._id}
          >
            <h1>Billamount: {spending.billamount}</h1>
            <h2>Campaign ID: {spending.campaignId}</h2>
            <h2>Is Super Customer?: {spending.isSuperCustomer.toString()}</h2>
            <h2>
              {suggestions.map(([key, val], index) => (
                <div key={index}>
                  <h3>
                    {key} : {val.toString()}
                  </h3>
                </div>
              ))}
            </h2>
          </div>
        );
      })}
      <h1>CUSTOMER USAGE BY TIME!</h1>
      {campaigns.map((campaign, index) => {
        return (
          <div key={index}>
            <h1>{campaign.name}</h1>
            <h2>{campaign.startDate}</h2>
            <h2>{campaign.endDate}</h2>
            <h2>{campaign.superCustomerPoints}</h2>
          </div>
        );
      })}
    </>
  );
};

export default Page;
