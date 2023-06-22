"use client";
import { useSession, signIn, signOut } from "next-auth/react";

import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session, status);

  return (
    <main style={{ marginTop: "2rem" }}>
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
        <button className="">Login</button>
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
