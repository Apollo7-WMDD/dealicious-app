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

  console.log(session?.user);

  const [results, setResults] = useState({});
  const { restaurantId } = params;

  useEffect(() => {
    const fetchRestaurant = async (restaurantId) => {
      const res = await fetch(`/api/restaurant/${restaurantId}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResults(data);
    };
    fetchRestaurant(restaurantId);
  }, []);

  return (
    <>
      <Navbar restaurantId={restaurantId} />
      <h1>Restaurant Home Page for Super Customers to Login or Sign Up</h1>
      <div>
        <>
          <Link
            href={`/login/superCustomer`}
            className="mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
          >
            <button>Login</button>
          </Link>
          <Link
            href={`/register`}
            className="mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
          >
            <button>Sign Up!</button>
          </Link>
          <Link href={`/superCustomer/restaurants/${session?.user.id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
              Dashboard SC
            </button>
          </Link>
        </>
        <Footer />
      </div>
    </>
  );
};

export default Page;
