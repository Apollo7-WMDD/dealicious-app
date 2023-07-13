"use client";

import { useEffect } from "react";
import Header from "@/app/components/Header/Header";
import SubHeader from "@/app/components/Header/SubHeader";

import ChartCard from "@/app/components/ChartCard";
import MainGrid from "@/app/components/MainGrid";
import DoughnutChart_NumCustomer from "../../../../../components/Chart/DoughnutChart_NumCustomer";
import LineChart from "../../../../../components/Chart/LineChart";
import BarChart from "../../../../../components/Chart/BarChart";
import StackDoughNut from "../../../../../components/Chart/StackDoughNut";
import ChartCardTitle from "../../../../../components/Chart/ChartCardTitle";

import { usePathname } from "next/navigation";

// user context
import { useStore } from "@/lib/context/user_context/store";

const Page = async () => {
  const {
    restaurantOwnerId,
    restaurantId,
    setRestaurantOwner,
    setRestaurantId,
  } = useStore();
  const pathname = usePathname();
  const URLrestaurantOwnerId = pathname.split("/")[4];
  const URLrestaurantId = pathname.split("/")[5];

  // ! check if this is needed any more after set up of up state at dashboard/page.jsx
  useEffect(() => {
    const setRestaurantOwnerFromParam = () => {
      setRestaurantOwner(URLrestaurantOwnerId);
    };
    setRestaurantOwnerFromParam();
  }, [URLrestaurantOwnerId]);

  useEffect(() => {
    const setRestaurantIdFromParam = () => {
      setRestaurantId(URLrestaurantId);
    };
    setRestaurantIdFromParam();
  }, [URLrestaurantId]);

  console.log("This is the URLrestaurantOwnerId: ", URLrestaurantOwnerId);
  console.log("This is the URLrestaurantId: ", URLrestaurantId);
  console.log("This is the restaurantOwnerId: ", restaurantOwnerId);
  console.log("This is the restaurantId: ", restaurantId);

  // const spendingsData = await fetchInsightsOverview(
  //   restaurantOwnerId,
  //   restaurantId
  // );
  // console.log(spendingsData);

  return (
    <>
      <Header props={"Insights"} />
      {/* CHANGE THIS COMPONENT TO DROWDOWN WITH ALL CAMPAIGN AND PINNED CAMPAIGN ON TOP */}
      <SubHeader props={"Campaing Data Overview(All)"} />
      <SubHeader
        props={"ADD THE CARDS AND MAKE THE FETCH IN THE CARD, NOT HERE!"}
      />

      {/*====== SET GRID ======*/}
      <MainGrid>
        <ChartCard gridColumn={"span 1"}>
          <ChartCardTitle text={"Number of:"} pinStatus={""}></ChartCardTitle>
          <DoughnutChart_NumCustomer></DoughnutChart_NumCustomer>
        </ChartCard>
        <ChartCard gridColumn={"span 2"}>
          <ChartCardTitle
            text={"Customer Campaign Usage By Time"}
            pinStatus={""}
          ></ChartCardTitle>
          <LineChart></LineChart>
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
        <ChartCardTitle
            text={"To improve:"}
            pinStatus={""}
          ></ChartCardTitle>
          <BarChart></BarChart>
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          <ChartCardTitle text={"Top 6 Campaigns"} pinStatus={""}></ChartCardTitle>
          <StackDoughNut ></StackDoughNut>
        </ChartCard>
        <ChartCard gridColumn={"span 2"}>
          averageBillSize
          {/* {spendingsData.averageBillSize} */}
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          to
          {/* {spendingsData.totalRevenue} */}
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          nonSuperCustomers
          {/* {spendingsData.customerCount.nonSuperCustomers} */}
          <br />
          superCustomers
          {/* {spendingsData.customerCount.superCustomers} */}
        </ChartCard>

        <ChartCard gridColumn={"span 1"}>
          foodQualityCount
          {/* {spendingsData.opportunities.foodQualityCount} */}
          <br />
          foodQuantityCount
          {/* {spendingsData.opportunities.foodQuantityCount} */}
          <br />
          placeCount
          {/* {spendingsData.opportunities.placeCount} <br /> */}
          serviceCount
          {/* {spendingsData.opportunities.serviceCount} */}
          <br />
        </ChartCard>

        <ChartCard gridColumn={"span 2"}>
          nonSuperCustomers
          {/* {spendingsData.customerSpendings.nonSuperCustomers} */}
          <br />
          superCustomers
          {/* {spendingsData.customerSpendings.superCustomers} */}
        </ChartCard>
        {/* {spendingsData.topCampaigns.map((item) => (
          <ChartCard gridColumn={"span 1"}>{item.campaignName}</ChartCard>
        ))} */}
      </MainGrid>
    </>
  );
};

export default Page;
