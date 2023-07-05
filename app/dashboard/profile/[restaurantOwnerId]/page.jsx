import Link from "next/link";

const fetchOwnerInfo = async (restaurantOwnerId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/dashboard/profile/${restaurantOwnerId}`
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
  const ownerData = await fetchOwnerInfo(restaurantOwnerId);

  return (
    <>
      <div>Profile of the Restaurant Owner</div>
      <h1>{restaurantOwnerId}</h1>
      <Link href={`/dashboard/profile/edit/${restaurantOwnerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Edit Profile
        </button>
      </Link>
      <Link href={`/dashboard/campaigns/active/${restaurantOwnerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to DashBoard
        </button>
      </Link>
      {ownerData && (
        <div
          style={{ margin: "1rem", border: "1px solid black" }}
          key={ownerData._id}
        >
          <h1>{ownerData.restaurantInfo.name}</h1>
          <h2>{ownerData.restaurantInfo.email}</h2>
          <h2>{ownerData.restaurantInfo.website}</h2>
          <h2>{ownerData.restaurantInfo.qrCode}</h2>
          <h3>{ownerData.restaurantInfo.address.street}</h3>
          <h3>{ownerData.restaurantInfo.address.postalCode}</h3>
          <h3>{ownerData.restaurantInfo.address.city}</h3>
          <h3>{ownerData.restaurantInfo.address.province}</h3>
          <h3>{ownerData.restaurantInfo.address.country}</h3>
        </div>
      )}
    </>
  );
};

export default Page;
