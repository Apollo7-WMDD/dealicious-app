import FormCampaigns from "../components/FormCampaigns";

// fetch all campaigns from the database
const fetchCampaigns = async () => {
  const res = await fetch("http://localhost:3000/api/campaigns", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Something went wrong...");

  return await res.json();
};

const Campaigns = async () => {
  const campaigns = await fetchCampaigns();

  return (
    <div className="grid grid-cols-2 gap-16">
      <div>
        <h1 className="text-4xl mb-5  block">Campaigns</h1>
        {campaigns.length === 0 ? (
          <p> Loading Campaigns!!</p>
        ) : (
          campaigns.map((campaign) => (
            <div key={campaign._id}>
              <h2>{campaign.name}</h2>
              <p>{campaign.availableCodes}</p>
            </div>
          ))
        )}
      </div>
      <div>
        <h2 className="text-4xl mb-5 text-center">Add a Campaign</h2>
        <FormCampaigns />
      </div>
    </div>
  );
};

export default Campaigns;
