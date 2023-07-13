"use client";
import Header from "@/app/components/Header/Header";
import Link from "next/link";

import { usePathname } from "next/navigation";

// user context
import { useStore } from "@/lib/context/user_context/store";
import { useEffect } from "react";

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

const Page = async () => {
  // const { restaurantOwnerId } = params;
  // const ownerData = await fetchOwnerInfo(restaurantOwnerId);
  // console.log("owner data: ", ownerData);
  
  const { restaurantOwnerId,setRestaurantOwner} = useStore();
  const pathname = usePathname();
  const URLrestaurantOwnerId = pathname.split("/")[3];
  useEffect(() => {
    const setRestaurantOwnerFromParam =  () => {
      setRestaurantOwner(URLrestaurantOwnerId);
    };
    setRestaurantOwnerFromParam();
  }, [URLrestaurantOwnerId]);
  console.log("restaurantOwnerId: ", restaurantOwnerId);
  

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
