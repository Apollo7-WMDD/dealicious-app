"use client";
import Link from "next/link";
import React from "react";
import Header from "../../../components/Header/Header";


const Page = ({ params }) => {
  const { restaurantOwnerId } = params;
  return (
    <>
      

      <Header props={"Burn a Code"} />
      
      
       
      <Link href={`/dashboard/campaigns/active/${restaurantOwnerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Dashboard
        </button>
      </Link>
    </>
  );
};

export default Page;
