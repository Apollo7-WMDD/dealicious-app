import Link from "next/link";

const fetchRestaurants = async (superCustomerId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/superCustomer/restaurants/${superCustomerId}`
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
  const restaurantData = await fetchRestaurants(superCustomerId);

  return (
    <>
      <h1>Restaurants List from the Super Customer</h1>
      <h2>{superCustomerId}</h2>
      <Link
        href={`/superCustomer/restaurants/${superCustomerId}/${restaurantId}`}
      >
        <button>Click individual Restaurant Card</button>
      </Link>
      <Link href={`/superCustomer/profile/${superCustomerId}`}>
        <button>Profile Super Customer</button>
      </Link>
      {restaurantData.map((data) => (
        <div key={data._id}>
          <h1>{data.restaurant.name}</h1>
          <h2>{data.restaurant.logo}</h2>
          <h2>{data.campaignCount}</h2>
        </div>
      ))}
    </>
  );
};

export default Page;
