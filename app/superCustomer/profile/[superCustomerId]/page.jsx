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
      <button className=" mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white">
        Save Changes
      </button>
      <Link href={`/superCustomer/restaurants/${superCustomerId}`}>
        <button className=" mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white">
          Cancel
        </button>
      </Link>
      <div className="m-10">
        <h1>{firstname}</h1>
        <h1>{lastname}</h1>
        <h1>{phone}</h1>
      </div>
    </>
  );
};

export default Page;
