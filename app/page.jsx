"use client";

// import next-auth hooks
import { useSession, signOut } from "next-auth/react";
import { useStore } from "@/lib/context/user_context/store";

// nextjs components
import Link from "next/link";
import { useEffect } from "react";

const Page = () => {
  const { data: session, status } = useSession();
  const { setRestaurantOwner, restaurantOwnerId } = useStore();
  console.log("This is the restaurantOwnerId: ", restaurantOwnerId);

  useEffect(() => {
    if (status === "authenticated") {
      setRestaurantOwner(session?.user.id);
    }
  }, [status]);

  return (
    <main>
      <h1 className="text-4xl font-bold text-blue-600">Landing Page</h1>
      <div>
        {status === "loading" ? (
          <div>Loading...</div>
        ) : status === "authenticated" ? (
          <div className="flex flex-col items-center justify-center">
            <Link href={`/dashboard/campaigns/active/${session?.user.id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded block m-4">
                Dashboard
              </button>
            </Link>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded block m-4"
              onClick={signOut}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <Link
              href={`/login/owner`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4"
            >
              <button>Login</button>
            </Link>
            <Link
              href={`/register`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4"
            >
              <button>Sign Up!</button>
            </Link>
          </>
        )}
      </div>
    </main>
  );
};

export default Page;
