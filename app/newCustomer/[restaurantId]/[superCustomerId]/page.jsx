"use client";
import Link from "next/link";
import Image from "next/image";
import SCRestaurantCard from "../../../components/SuperCustomer/SCRestaurantCard";
import SCHeader from "../../../components/Header/SCHeader";
import SCFooter from "../../../components/Footer/SCFooter";
import CampaignCard from "@/app/components/SuperCustomer/CampaignCard";
import NewCustomer from "@/app/components/NewCustomer/NewCustomer";
import { Box } from "@mui/material";

const fetchRestaurant = async (superCustomerId, restaurantId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/superCustomer/newCustomer/${superCustomerId}/${restaurantId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Something went wrong...");

  const data = await res.json();
  return data;
};

const Page = async ({ params }) => {
  const { superCustomerId, restaurantId } = params;
  const restaurantData = await fetchRestaurant(superCustomerId, restaurantId);
  console.log(restaurantData)

  const cards = restaurantData.campaigns.map((item, index) => <CampaignCard key={index} props={item} />);

  return (
    <>
      <SCHeader />
      <Box
        sx={{
          display:'flex',
          flexDirection:'row',
          gap: '3%',
          m:'1rem',
          p:0,
        }}
      >
        <NewCustomer props={restaurantData.user}></NewCustomer>
        <SCRestaurantCard props={restaurantData.restaurant} />
      </Box>
      <Box>
        {cards}
      </Box> 
      <SCFooter />
    </>
  );
};

export default Page;

// import Link from "next/link";

// const fetchRestaurant = async (restaurantId, superCustomerId) => {
//   const isProduction = process.env.NODE_ENV === "production";
//   const serverUrl = isProduction
//     ? process.env.NEXT_PUBLIC_SERVER_URL
//     : "http://localhost:3000";

//   const res = await fetch(
//     `${serverUrl}/api/newCustomer/${restaurantId}/${superCustomerId}`
//     // {
//     //   cache: "no-store",
//     // }
//   );

//   if (!res.ok) throw new Error("Something went wrong...");

//   const data = await res.json();
//   return data;
// };

// const Page = async ({ params }) => {
//   const { restaurantId, superCustomerId } = params;
//   const restaurantData = await fetchRestaurant(restaurantId, superCustomerId);
//   console.log(restaurantData);

//   return (
//     <>
//       <h1>
//         New Customer page that shows all the Campaigns of a restaurant that a
//         Super Customer shared his special link with you from that specific
//         restaurant
//       </h1>
//       <Link href={`/home/${restaurantId}`}>
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
//           Home - Restaurant
//         </button>
//       </Link>
//     </>
//   );
// };

// export default Page;
