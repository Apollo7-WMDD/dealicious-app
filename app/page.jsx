"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useMemo  } from 'react';
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import Link from "next/link";
import { useStore } from "./store.js";
<<<<<<< HEAD
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
=======
import {
  Box, useTheme
} from "@mui/material";
import SideBar from "./components/SideBar.jsx";

const Page = () => {
  const { data: session, status } = useSession();
  
  // const { mode } = useStore();
  // const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));
  const theme = useTheme();
  console.log(session, status);

  // hardcode superCustomerId for now until we have a login page and get the superCustomerId from the link that the Super Customer shared with the Customer
  const superCustomerId = "vsvererv223r2244f";
  const restaurantId = "vsvererv223r55555f";

  return (
    
    <main style={{ marginTop: "2rem" }}>
    
      <Link
        href={`/newCustomer/${restaurantId}/${superCustomerId}`}
        className=" mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
      >
        <button className="">New Customer</button>
      </Link>
      <Link
        href="/users"
        className=" mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
      >
        <button className="">Users</button>
      </Link>
      <Link
        href="/campaigns"
        className=" mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
      >
        <button className="">Campaigns</button>
      </Link>
      <Link
        href="/login"
        className=" mx-2 px-4 py-2 border-solid border-blue-700 border-2 rounded-md bg-blue-700 text-white"
      >
        <button className="">
          {status === "loading" || status === "authenticated"
            ? "User Dashboard"
            : "Login"}
        </button>
      </Link>
      <Link
        href="/register"
        className=" mx-2 px-4 py-2 border-solid border-blue-700 border-2 rounded-md bg-blue-700 text-white"
      >
        <button className="">Sign Up</button>
      </Link>
      <Link 
      style={{backgroundColor: theme.palette.secondary[60]}}
        href="/points"
        className=" mx-2 px-4 py-2 border-solid border-red-700  bg-red-700 border-2 rounded-md  text-white"
      >
        <button className="">Points</button>
      </Link>
      <Box 
      sx={{ backgroundColor: theme.palette.secondary[60]}}
      >ssssssss</Box>
      <Box       >xxxxxxx</Box>
      {session && (
        <button
          className=" mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
          onClick={signOut}
        >
          Sign Out
        </button>
      )}
>>>>>>> c8b5d6b97c5f2d750f2252ab66a02042812e86de
    </main>
  );
};

export default Page;
