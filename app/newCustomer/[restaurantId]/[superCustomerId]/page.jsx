const fetchRestaurant = async (restaurantId, superCustomerId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/newCustomer/${restaurantId}/${superCustomerId}`
    // {
    //   cache: "no-store",
    // }
  );

  if (!res.ok) throw new Error("Something went wrong...");

  const data = await res.json();
  return data;
};

const Page = async ({ params }) => {
  const { restaurantId, superCustomerId } = params;
  const restaurantData = await fetchRestaurant(restaurantId, superCustomerId);
  const { restaurant, campaigns } = restaurantData;
  console.log(restaurant);
  console.log(campaigns);

  return (
    <>
      <h1>
        New Customer page that shows all the Campaigns of a restaurant that a
        Super Customer shared his special link with you from that specific
        restaurant
      </h1>
      <h2>{restaurantId}</h2>
      <h2>{superCustomerId}</h2>
      {
        <div className="m-10">
          <h3>Restaurant Info:</h3>
          <p>{restaurant.name}</p>
          <p>{restaurant.phone}</p>
          <p>{restaurant.menu}</p>
          <p>{restaurant.address.street}</p>
          <p>{restaurant.address.city}</p>
          <p>{restaurant.address.state}</p>
        </div>
      }
      <div className="m-10">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="m-10">
            <h3>Campaign Info:</h3>
            <p>{campaign.name}</p>
            <p>{campaign.offer}</p>
            <p>{campaign.endDate}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
