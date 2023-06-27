"use client";
import { useSession, signIn, signOut } from "next-auth/react";

import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
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
        href="/points"
        className=" mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
      >
        <button className="">Points</button>
      </Link>
      {session && (
        <button
          className=" mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
          onClick={signOut}
        >
          Sign Out
        </button>
      )}
    </main>
  );
}
