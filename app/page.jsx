"use client";

// auth imports
import { useSession, signOut } from "next-auth/react";

// NEXTjs imports
import Link from "next/link";

//  component imports
import Navbar from "./components/LandingPage/Navbar";

const Page = () => {
  const { data: session, status } = useSession();
  console.log("status", status);
  console.log("data", session?.user);

  return (
    <>
      <div>Landing Page</div>
      <div>
        {status === "loading" ? (
          <div>Loading...</div>
        ) : status === "authenticated" ? (
          <>
            <button
              className="mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
              onClick={signOut}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              href={`/login`}
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
          </>
        )}
      </div>
    </>
  );
};

export default Page;
