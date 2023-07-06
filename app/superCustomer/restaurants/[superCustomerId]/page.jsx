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
  console.log(restaurantData);

  return (
    <>
      <h1>Restaurants List from the Super Customer</h1>
      <h2>{superCustomerId}</h2>
      <Link
        href={`/superCustomer/restaurants/${superCustomerId}/${restaurantId}`}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Restaurant Card
        </button>
      </Link>
      <Link href={`/superCustomer/profile/${superCustomerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Profile Super Customer
        </button>
      </Link>
    </>
  );
};

export default Page;
