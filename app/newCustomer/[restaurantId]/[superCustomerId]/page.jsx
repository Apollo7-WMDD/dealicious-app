"use client";

import Link from "next/link";
import Image from "next/image";
import SCRestaurantCard from "../../../components/SuperCustomer/SCRestaurantCard";
import SCHeader from "../../../components/Header/SCHeader";
import SCFooter from "../../../components/Footer/SCFooter";
import CampaignCard from "@/app/components/SuperCustomer/CampaignCard";
import NewCustomer from "@/app/components/NewCustomer/NewCustomer";
import { Box } from "@mui/material";
import { useEffect } from "react";

const Page = ({ params }) => {
  const { superCustomerId, restaurantId } = params;
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    const fetchRestaurant = async (superCustomerId, restaurantId) => {
      const res = await fetch(
        `/api/superCustomer/newCustomer/${superCustomerId}/${restaurantId}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) throw new Error("Something went wrong...");

      const data = await res.json();
      setRestaurantData(data);
    };

    fetchRestaurant(superCustomerId, restaurantId);
    console.log(restaurantData);
  }, [superCustomerId, restaurantId]);

  return (
    <>
      <SCHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "3%",
          m: "1rem",
          p: 0,
        }}
      >
        <NewCustomer props={restaurantData.user}></NewCustomer>
        <SCRestaurantCard props={restaurantData.restaurant} />
      </Box>
      <Box>
        {!restaurantData ? (
          <h1>Loading...</h1>
        ) : (
          restaurantData.campaigns.map((item, index) => (
            <CampaignCard key={index} props={item} />
          ))
        )}
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
