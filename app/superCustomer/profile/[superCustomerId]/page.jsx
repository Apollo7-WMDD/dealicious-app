import Link from "next/link";

const fetchUser = async (superCustomerId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/superCustomer/profile/${superCustomerId}`
    // {
    //   cache: "no-store",
    // }
  );

  if (!res.ok) throw new Error("Something went wrong...");

  const data = await res.json();
  return data;
};

const Page = async ({ params }) => {
  const { superCustomerId } = params;
  const { user } = await fetchUser(superCustomerId);
  const { firstname, lastname, phone } = user;

  return (
    <>
      <h1>Profile of the Super Customer</h1>
      <h2>{superCustomerId}</h2>
      <Link href={`/superCustomer/restaurants/${superCustomerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Save Changes
        </button>
      </Link>
      <Link href={`/superCustomer/restaurants/${superCustomerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Cancel
        </button>
      </Link>
    </>
  );
};

export default Page;
