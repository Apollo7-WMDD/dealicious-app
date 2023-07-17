"use client";

// NEXTjs imports
import Link from "next/link";

// session imports
import { useSession } from "next-auth/react";

// react import
import { useEffect, useState } from "react";

//  component imports
import Navbar from "@/app/components/LandingPage/Navbar";
import Footer from "@/app/components/Footer";

const Page = ({ params }) => {
  const { data: session, status } = useSession();
  const [results, setResults] = useState({});
  const { restaurantId } = params;

  useEffect(() => {
    const fetchRestaurant = async (restaurantId) => {
      const res = await fetch(`/api/restaurant/all_campaigns/${restaurantId}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResults(data);
    };
    fetchRestaurant(restaurantId);
  }, []);

  console.log("This is the results: ", results);

  return (
    <>
      <Navbar />
      <h1>Restaurant Home Page for Super Customers to Login or Sign Up</h1>
      <div>
        <>
          <Link href={`/login/superCustomer/${restaurantId}`}>
            <button>Login</button>
          </Link>
          <Link href={`/register`}>
            <button>Sign Up!</button>
          </Link>
          <Link href={`/superCustomer/restaurants/${session?.user.id}`}>
            <button>Dashboard SC</button>
          </Link>
        </>
        <Footer />
      </div>
    </>
  );
};

export default Page;
