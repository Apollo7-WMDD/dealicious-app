"use client";
import Link from "next/link";
import Header from "@/app/components/Header/Header";
import SubHeader from "@/app/components/Header/SubHeader";

import ChartCard from "@/app/components/ChartCard";
import MainGrid from "@/app/components/MainGrid";
import { Box } from "@mui/material";

// user context
import { useStore } from "@/lib/context/user_context/store";

const Page = async () => {
  const { restaurantOwnerId, restaurantId } = useStore();

  console.log("This is the restaurantOwnerId 2: ", restaurantOwnerId);
  console.log("This is the restaurantId: ", restaurantId);

  return (
    <>
      <Header props={"Insights"} />
      {/* CHANGE THIS COMPONENT TO DROWDOWN WITH ALL CAMPAIGN AND PINNED CAMPAIGN ON TOP */}
      <SubHeader props={"Campaing Data Overview(All)"} />
      <SubHeader
        props={"ADD THE CARDS AND MAKE THE FETCH IN THE CARD, NOT HERE!"}
      />

      {/*====== SET GRID ======*/}
      {/* <MainGrid>
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
      </MainGrid> */}
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

      {/* <Box sx={{ height: "400px" }}></Box>
      <Link href={`/dashboard/campaigns/active/${restaurantOwnerId}`}>
        <button>Dashboard</button>
      </Link>
      <Link
        href={`/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId}`}
      >
        <button>Insights - Campaigns</button>
      </Link>
      <Link
        href={`/dashboard/insights/customers/${restaurantOwnerId}/${restaurantId}`}
      >
        <button>Insights - Customers</button>
      </Link> */}
    </>
  );
};

export default Page;
