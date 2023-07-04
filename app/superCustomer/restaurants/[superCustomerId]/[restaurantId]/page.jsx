const fetchSingleRestaurant = async (restaurantId, superCustomerId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/superCustomer/singleRestaurant/${superCustomerId}/${restaurantId}`
    // {
    //   cache: "no-store",
    // }
  );

  if (!res.ok) throw new Error("Something went wrong...");

  const data = await res.json();
  return data;
};

const Page = async ({ params }) => {
  const { superCustomerId, restaurantId } = params;
  const restaurant = await fetchSingleRestaurant(restaurantId, superCustomerId);
  const restaurantData = restaurant.restaurant;
  const campaigns = restaurant.campaigns;
  const points = restaurant.points;

  return (
    <>
      <h1>
        Restaurant Single Page for the Super Customer when click on the Card
      </h1>
      <h2>{superCustomerId}</h2>
      <h2>{restaurantId}</h2>
      <div className="m-10">
        <h1>RESTAURANT INFO: </h1>
        <p>{restaurantData.name}</p>
        <p>{restaurantData.phone}</p>
        <p>{restaurantData.website}</p>
        <p>{restaurantData.menu}</p>
        <h1>Address...</h1>
        <p>{restaurantData.address.street}</p>
        <p>{restaurantData.address.city}</p>
        <p>{restaurantData.address.province}</p>
        <p>{restaurantData.address.postalCode}</p>
        <p>{restaurantData.address.country}</p>
      </div>
      <div className="m-10">
        {campaigns.map((campaign) => {
          return (
            <div key={campaign._id} className="m-10">
              <h1>CAMPAIGN INFO: </h1>
              <p>{campaign.name}</p>
              <p>{campaign.offer}</p>
              <p>{campaign.endDate}</p>
            </div>
          );
        })}
      </div>
      <div className="m-10">
        <h1>Number of points: {points.totalPoints}</h1>
      </div>
    </>
  );
};

export default Page;
