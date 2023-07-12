"use client";
import Header from "../../../components/Header/Header";
import Link from "next/link";

const Page = async ({ params }) => {
  const { restaurantOwnerId } = params;

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
