"use client";
import Link from "next/link";
import Header from "../../../components/Header/Header";
import SCCard from "../../../components/Card/SCCard";
import { useEffect } from "react";

const fetchRestaurants = async (superCustomerId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/superCustomer/restaurants/${superCustomerId}`
  );

  if (!res.ok) throw new Error("Something went wrong...");

  const data = await res.json();
  return data;
};

const Page = async () => {
  
  

  const { superCustomerId } = params;
  const restaurantData = await fetchRestaurants(superCustomerId);

  // Access the name of the first element
  //const firstRestaurantName = restaurantData && restaurantData.length > 0 ? restaurantData[0].name : '';

  console.log(data);
  //console.log(data[0].name);


  //console.log(restaurantData);
  //console.log(restaurantData);
  //console.log(restaurantData[0].map(item => item.name));
  return (
    <div>
      <Header props={"My Restaurants"} />
      <SCCard props={"A"}/>
      {/* <SCCard props={data[1].name}/>
      <SCCard props={data[2].name}/>
      <SCCard props={data[3].name}/>
      <SCCard props={data[4].name}/>
      <SCCard props={data[5].name}/> */}
    </div>
  );
};

export default Page;


// import Header from "@/app/components/Header/Header";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// // user context
// import { useStore } from "@/lib/context/user_context/store";
// import { useEffect } from "react";

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

// const Page = async () => {
//   // const { restaurantOwnerId } = params;
//   // const ownerData = await fetchOwnerInfo(restaurantOwnerId);
//   // console.log("owner data: ", ownerData);

//   const { restaurantOwnerId,setRestaurantOwner} = useStore();
//   const pathname = usePathname();
//   const URLrestaurantOwnerId = pathname.split("/")[3];
//   useEffect(() => {
//     const setRestaurantOwnerFromParam =  () => {
//       setRestaurantOwner(URLrestaurantOwnerId);
//     };
//     setRestaurantOwnerFromParam();
//   }, [URLrestaurantOwnerId]);
//   console.log("restaurantOwnerId: ", restaurantOwnerId);


//   return (
//     <>
//       <Header props={"Profile"}></Header>
//       <div>Profile of the Restaurant Owner</div>
//       <h1>{restaurantOwnerId}</h1>
//       <Link href={`/dashboard/profile/edit/${restaurantOwnerId}`}>
//         <button>Edit Profile</button>
//       </Link>
//       <Link href={`/dashboard/campaigns/active/${restaurantOwnerId}`}>
//         <button>Back to DashBoard</button>
//       </Link>
//     </>
//   );
// };
// export default Page;










// const Page = async ({ params }) => {
//   const { superCustomerId, restaurantId } = params;
//   const restaurantData = await fetchRestaurants(superCustomerId);
//   console.log(restaurantData);

//   return (
//     <div>
//       <SCCard />
//       <Box>
//           <div>
//             <Header props={"My Restaurants"} />            
//           </div>
//       </Box>
//     </div>
//     // <>
//     //   <Header>My Restaurants</Header>
//     //   <h2>{superCustomerId}</h2>
//     //   <Link
//     //     href={`/superCustomer/restaurants/${superCustomerId}/${restaurantId}`}
//     //   >
//     //     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
//     //       Restaurant Card
//     //     </button>
//     //   </Link>
//     //   <Link href={`/superCustomer/profile/${superCustomerId}`}>
//     //     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
//     //       Profile Super Customer
//     //     </button>
//     //   </Link>
//     // </>
//   );
// };

// export default Page;
