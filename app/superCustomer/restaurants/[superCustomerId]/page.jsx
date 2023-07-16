"use client";
import Header from "../../../components/Header/Header";
import SCCard from "../../../components/Card/SCCard";
import SCHeader from "../../../components/Header/SCHeader"
import SCFooter from "../../../components/Footer/SCFooter"
import { Box } from "@mui/material";
import Link from "next/link";

const fetchRestaurants = async (superCustomerId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/superCustomer/restaurants/${superCustomerId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Something went wrong...");

  const data = await res.json();
  return data;
};

const Page = async ({ params }) => {
  const { superCustomerId } = params;
  const data = await fetchRestaurants(superCustomerId);
  console.log(data);
  //const activeCampaigns = data[0].filter(campaign => campaign.status === 'active');
  //console.log(activeCampaigns);

  const cards = data.map((item, index) => <SCCard key={index} props={{ ...item, superCustomerId }} />);

  return (
    <Box>
      <SCHeader />
      <Box
        sx={{
          p:'3%'
        }}
      >
        <Header props={"My Restaurants"} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap:"3%",
          }}
        >
        {/* <Link href={`/`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
            Insights - Overview
          </button>
        </Link> */}
          {cards}
        </Box>
      </Box>
      <SCFooter />
    </Box>
  );
};

export default Page;