import PassContext from "@/app/components/Dashboard/PassContext";
import Link from "next/link";

const fetchRestaurants = async (restaurantOwnerId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/dashboard/campaigns/active/${restaurantOwnerId}`
    // {
    //   cache: "no-store",
    // }
  );

  if (!res.ok) throw new Error("Something went wrong...");

  const data = await res.json();
  return data;
};

const Page = async ({ params }) => {
  const { restaurantOwnerId } = params;
  const restaurantData = await fetchRestaurants(restaurantOwnerId);
  const restaurantId = restaurantData.restaId;

  return (
    <>
      <PassContext
        restaurantOwnerId={restaurantOwnerId}
        restaurantId={restaurantId}
      />
      <div>Restaurant Owner - Active Campaigns </div>
      {<span>{"This is the restaurant ID: " + restaurantId}</span>}
      <h1>{"This is the restaurantOwner ID: " + restaurantOwnerId}</h1>

      <Link href={`/dashboard/campaigns/createNew/${restaurantOwnerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create a campaign
        </button>
      </Link>
      {restaurantData.campaigns.map((campaign) => (
        <div
          style={{ margin: "1rem", border: "1px solid black" }}
          key={campaign.campaignId}
        >
          <h1>{campaign.name}</h1>
          <h2>{campaign._id}</h2>
          <h2>{campaign.status}</h2>
          <h2>{campaign.startDate}</h2>
          <h2>{campaign.endDate}</h2>
        </div>
      ))}
    </>
  );
};

export default Page;
