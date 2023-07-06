"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useMemo  } from 'react';
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import Link from "next/link";
import { useStore } from "./store.js";
import {
  Box, useTheme
} from "@mui/material";
import SideBar from "./components/sidebar/SideBar.jsx";


export default function Home() {
  const { data: session, status } = useSession();
  
  // const { mode } = useStore();
  // const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));
  const theme = useTheme();
  console.log(session, status);

  

  // hardcode superCustomerId for now until we have a login page and get the superCustomerId from the link that the Super Customer shared with the Customer
  const superCustomerId = "vsvererv223r2244f";
  const restaurantId = "vsvererv223r55555f";

  return (
    
    <main >
    
      <Link
        href={`/newCustomer/${restaurantId}/${superCustomerId}`}
        className=" mx-2 px-4 inline-block  border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
      >
        <button className="">New Customer</button>
      </Link>
      <Link
        href="/users"
        className=" mx-2 px-4 inline-block  border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
      >
        <button className="">Users</button>
      </Link>
      <Link
        href="/campaigns"
        className=" mx-2 px-4 inline-block  border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
      >
        <button className="">Campaigns</button>
      </Link>
      <Link
        href="/login"
        className=" mx-2 px-4 inline-block  border-solid border-blue-700 border-2 rounded-md bg-blue-700 text-white"
      >
        <button className="">
          {status === "loading" || status === "authenticated"
            ? "User Dashboard"
            : "Login"}
        </button>
      </Link>
      <Link
        href="/register"
        className=" mx-2 px-4 inline-block  border-solid border-blue-700 border-2 rounded-md bg-blue-700 text-white"
      >
        <button className="">Sign Up</button>
      </Link>
      <Link 
      style={{backgroundColor: "theme.palette.secondary[60]}"}}
      // style={{backgroundColor: "gold"}}
        href="/points"
        className=" mx-2 px-4 inline-block  border-solid border-red-700  border-2 rounded-md bg-red-700 text-white"
      >
        <button 
        // style={{backgroundColor: theme.palette.secondary[60]}}
         className="">Points</button>
      </Link>
      <Box 
      sx={{ backgroundColor: theme.palette.secondary[60]}}
      >ssssssss</Box>
      <Box       >xxxxxxx</Box>
      {session && (
        <button
          className=" mx-2 px-4 inline-block  border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
          onClick={signOut}
        >
          Sign Out
        </button>
      )}
    </main>
  );
}
