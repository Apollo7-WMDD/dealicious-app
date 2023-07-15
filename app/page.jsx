"use client";
// !HOLA AMIGOS

// import next-auth hooks
import { useSession, signOut } from "next-auth/react";
import { useStore } from "@/lib/context/user_context/store";

// nextjs components
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import Home from "./components/LandingPage/Home";

// loader
import Loader from "./components/Loader";

// import fetching data
// import { fetchRestaurantId } from "@/lib/fetching/restaurantId/data";

const Page = () => {
  const { data: session, status } = useSession();
  const { setRestaurantOwner, restaurantOwnerId } = useStore();

  console.log("This is the restaurantOwnerId: ", restaurantOwnerId);

  useEffect(() => {
    const getRestaurantOwnerId = async () => {
      if (status === "authenticated") {
        setRestaurantOwner(session.user.id);
      }
    };
    getRestaurantOwnerId();
  }, [status]);

  return (
    <main>
      <Home />
      {status === "loading" ? (
        <Loader />
      ) : status === "authenticated" ? (
        <div>
          <Link href={`/dashboard/campaigns/active/${session?.user.id}`}>
            <button>Dashboard</button>
          </Link>
          <Link href={`/superCustomer/restaurants/${session?.user.id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
              Dashboard Super Customer (Temporal-Testing)
            </button>
          </Link>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <>
          <Link href={`/login/owner`}>
            <button>Login</button>
          </Link>
          <Link href={`/register`}>
            <button>Sign Up!</button>
          </Link>
        </>
      )}
    </main>
  );
};

export default Page;
