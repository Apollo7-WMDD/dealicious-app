"use client";
import Link from "next/link";
import Image from "next/image";
import SCRestaurantCard from "../../../../components/SuperCustomer/SCRestaurantCard";
import SCHeader from "../../../../components/Header/SCHeader";
import SCFooter from "../../../../components/Footer/SCFooter";
import PointsEarned from '../../../../components/SuperCustomer/PointsEarned';
import Share from '../../../../components/SuperCustomer/Share';
import CampaignCard from "@/app/components/SuperCustomer/CampaignCard";
import { Card, CardActions, CardContent, Box, Typography } from "@mui/material";

const fetchRestaurants = async (superCustomerId, restaurantId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/superCustomer/singleRestaurant/${superCustomerId}/${restaurantId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Something went wrong...");

  const data = await res.json();
  return data;
};

// function ActivationModal({item}) {
//   return (
//     <>
//       <h1>{item.name}</h1>
//       <p>Offer at: {item.offer}</p>
//       <p>Starts at: {item.startDate}</p>
//       <Image
//         src={item.media[0]}
//         alt="image"
//         width={20}
//         height={20}
//       />
//     </>
//   );
// }

// function Campaign({ item }) {
//   return (
//     <>
//       <h2>{item.name}</h2>
//       <p>{item.description}</p>
//       <Link href="#">More information</Link>
//       <button>Activate</button>
//     </>
//   );
// }

// function Campaigns({ items }) {
//   return (
//     <>
//       <h1>Ongoing campaigns, exclusively for you</h1>
//       {items.map((item) => (
//         <Campaign key={item.id} item={item} />
//       ))}
//     </>
//   );
// };

const Page = async ({ params }) => {
  const { superCustomerId, restaurantId } = params;
  const restaurantData = await fetchRestaurants(superCustomerId, restaurantId);
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
        <SCRestaurantCard props={restaurantData.restaurant} />
        <PointsEarned props={restaurantData.points}></PointsEarned>
      </Box>
      <Box
        sx={{
          display:'grid',
          gridTemplateColumns: '1fr 2fr',
          m:'1rem',
          p:0,
          gap:'1rem'
        }}
      >
        <Box
          sx={{
            borderRadius: '10px',
            boxShadow: 20,
          }}
        >
          <Share/>
        </Box>
        <Box
        >
          {cards}
        </Box>        
      </Box>
      {/* <h2>{superCustomerId}</h2>
      <Link
        href={`/superCustomer/restaurants/${superCustomerId}/${restaurantId}`}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Restaurant Card
        </button>
      </Link>
      <Link href={`/superCustomer/profile/${superCustomerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Profile Super Customer
        </button>
      </Link>

      <Campaigns items={restaurantData.campaigns} /> */}
      <SCFooter />
    </>
  );
};

export default Page;