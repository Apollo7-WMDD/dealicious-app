"use client";
import Link from "next/link";
import Header from "@/app/components/Header/Header";
import SubHeader from "@/app/components/Header/SubHeader";

import ChartCard from "@/app/components/ChartCard";
import MainGrid from "@/app/components/MainGrid";
import { Box } from "@mui/material";

// user context
import { useStore } from "@/lib/context/user_context/store";

const fetchInsightsOverview = async (restaurantOwnerId, restaurantId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/dashboard/insights/overview/${restaurantOwnerId}/${restaurantId}`
    // {
    //   cache: "no-store",
    // }
  );

  if (!res.ok) throw new Error(res.text());

  const data = await res.json();
  console.log("fetch is done");
  return data;
};

const Page = async () => {
  const { restaurantOwnerId, restaurantId } = useStore();

  console.log("This is the restaurantOwnerId: ", restaurantOwnerId);

  console.log("This is the restaurantId: ", restaurantId);

  const spendingsData = await fetchInsightsOverview(
    restaurantOwnerId,
    restaurantId
  );
  console.log(spendingsData);

  return (
    <>
      <Header props={"Insights"} />
      {/* CHANGE THIS COMPONENT TO DROWDOWN WITH ALL CAMPAIGN AND PINNED CAMPAIGN ON TOP */}
      <SubHeader props={"Campaing Data Overview(All)"} />

      {/*====== SET GRID ======*/}
      <MainGrid>
        <ChartCard gridColumn={"span 2"}>
          averageBillSize
          {spendingsData.averageBillSize}
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          totalRevenue
          {spendingsData.totalRevenue}
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          nonSuperCustomers
          {spendingsData.customerCount.nonSuperCustomers}
          <br />
          superCustomers
          {spendingsData.customerCount.superCustomers}
        </ChartCard>

        <ChartCard gridColumn={"span 1"}>
          foodQualityCount
          {spendingsData.opportunities.foodQualityCount}
          <br />
          foodQuantityCount
          {spendingsData.opportunities.foodQuantityCount}
          <br />
          placeCount
          {spendingsData.opportunities.placeCount} <br />
          serviceCount
          {spendingsData.opportunities.serviceCount}
          <br />
        </ChartCard>

        <ChartCard gridColumn={"span 2"}>
          nonSuperCustomers
          {spendingsData.customerSpendings.nonSuperCustomers}
          <br />
          superCustomers
          {spendingsData.customerSpendings.superCustomers}
        </ChartCard>
        {spendingsData.topCampaigns.map((item) => (
          <ChartCard gridColumn={"span 1"}>{item.campaignName}</ChartCard>
        ))}
      </MainGrid>
      {/* <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          gridAutoFlow: "row dense"
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            height: "400px",
            width: "1fr",
          }}
        >
          ddd
        </Box>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            height: "400px",
            width: "1fr",
          }}
        >
          333
        </Box>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            height: "400px",
            width: "1fr",
          }}
        >
          321
        </Box>
      </Box> */}
      {/* <ChartCard content={{toBarData}} gridColumn={"span 3"} /> */}

      <Box sx={{ height: "400px" }}></Box>
      <Link href={`/dashboard/campaigns/active/${restaurantOwnerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Dashboard
        </button>
      </Link>
      <Link
        href={`/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId}`}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Insights - Campaigns
        </button>
      </Link>
      <Link
        href={`/dashboard/insights/customers/${restaurantOwnerId}/${restaurantId}`}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Insights - Customers
        </button>
      </Link>
    </>
  );
};

export default Page;
