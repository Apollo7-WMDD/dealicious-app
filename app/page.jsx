import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
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
        href="/points"
        className=" mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
      >
        <button className="">Points</button>
      </Link>
    </main>
  );
}
