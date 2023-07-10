"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import Link from "next/link";
import { useStore } from "./store.js";
import { Box, useTheme } from "@mui/material";

const Page = () => {
  const { data: session, status } = useSession();
  console.log("status", status);
  console.log("data", session?.user);
  const theme = useTheme();
  console.log(session, status);
  return (
    <main>
      <div>Landing Page</div>
      <div>
        {status === "loading" ? (
          <div>Loading...</div>
        ) : status === "authenticated" ? (
          <div className="flex flex-col items-center justify-center">
            <Link href={`/dashboard/campaigns/active/${session?.user.id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
                Dashboard
              </button>
            </Link>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4"
              onClick={signOut}
            >
              Sign Out
            </button>
            <Link href={`/superCustomer/restaurants/${session?.user.id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
                Dashboard Super Customer (Temporal-Testing)
              </button>
            </Link>
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
