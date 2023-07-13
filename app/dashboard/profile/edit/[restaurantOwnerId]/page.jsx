import Link from "next/link";

// const fetchOwnerInfo = async (restaurantOwnerId) => {
//   const isProduction = process.env.NODE_ENV === "production";
//   const serverUrl = isProduction
//     ? process.env.NEXT_PUBLIC_SERVER_URL
//     : "http://localhost:3000";

//   const res = await fetch(
//     `${serverUrl}/api/dashboard/profile/${restaurantOwnerId}`
//     // {
//     //   cache: "no-store",
//     // }
//   );

//   if (!res.ok) throw new Error("Something went wrong...");

//   const data = await res.json();
//   return data;
// };

const Page = async ({ params }) => {
  const { restaurantOwnerId } = params;

  return (
    <>
      <h1>Edit Profile Page to Add or Edit Restaurant Info</h1>
      <h1>{restaurantOwnerId}</h1>
      <Link href={`/dashboard/profile/${restaurantOwnerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save or Add Profile
        </button>
      </Link>
    </>
  );
};

export default Page;
