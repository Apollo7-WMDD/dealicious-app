"use client";
import Header from "@/app/components/Header/Header";
import Link from "next/link";

const Page = async ({ params }) => {
  const { restaurantOwnerId } = params;

  return (
    <>
      <Header props={"Profile"}></Header>
      <div>Profile of the Restaurant Owner</div>
      <h1>{restaurantOwnerId}</h1>
      <Link href={`/dashboard/profile/edit/${restaurantOwnerId}`}>
        <button>Edit Profile</button>
      </Link>
      <Link href={`/dashboard/campaigns/active/${restaurantOwnerId}`}>
        <button>Back to DashBoard</button>
      </Link>
    </>
  );
};

export default Page;
