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
  console.log(restaurant);

  return (
    <>
      <h1>
        Restaurant Single Page for the Super Customer when click on the Card
      </h1>
    </>
  );
};

export default Page;
