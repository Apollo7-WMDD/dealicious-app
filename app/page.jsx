"use client";

// import next-auth hooks
import { useSession, signOut } from "next-auth/react";
import { useStore } from "@/lib/context/user_context/store";

// nextjs components
import Link from "next/link";
import { useEffect } from "react";
import Home from "./components/LandingPage/Home";

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
        <div>Loading...</div>
      ) : status === "authenticated" ? (
        <div>
          <Link href={`/dashboard/campaigns/active/${session?.user.id}`}>
            <button>Dashboard</button>
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
