"use client";
import Header from "../../../components/Header/Header";
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
  console.log("owner data: ", ownerData);

  return (
    <>
      <Header props={"Profile"}></Header>
      <div>Profile of the Restaurant Owner</div>
      <h1>{restaurantOwnerId}</h1>
      <Link href={`/dashboard/profile/edit/${restaurantOwnerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Edit Profile
        </button>
      </Link>
      <Link href={`/dashboard/campaigns/active/${restaurantOwnerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Back to DashBoard
        </button>
      </Link>
    </>
  );
};

export default Page;
