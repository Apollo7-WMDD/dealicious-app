"use client";

import { useEffect } from "react";
import Header from "@/app/components/Header/Header";
import SubHeader from "@/app/components/Header/SubHeader";

import ChartCard from "@/app/components/Card/ChartCard";
import MainGrid from "@/app/components/MainGrid";
import DoughnutChart_NumCustomer from "../../../../../components/Chart/DoughnutChart_NumCustomer";
import LineChart from "../../../../../components/Chart/LineChart";
import BarChart from "../../../../../components/Chart/BarChart";
import StackDoughNut from "../../../../../components/Chart/StackDoughNut";
import ChartCardTitle from "../../../../../components/Chart/ChartCardTitle";


const Page = async () => {
 

  return (
    <>
      <Header props={"Insights"} />
      {/* //! CHANGE THIS COMPONENT TO DROWDOWN WITH ALL CAMPAIGN AND PINNED CAMPAIGN ON TOP */}
      <SubHeader props={"Campaing Data Overview(All)"} />


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
        <ChartCard gridColumn={"span 2"}>
          <ChartCardTitle text={"Top Campaigns"} pinStatus={""}></ChartCardTitle>
          <StackDoughNut ></StackDoughNut>
        </ChartCard>
        <ChartCard gridColumn={"span 2"}>
          averageBillSize
          {/* {spendingsData.averageBillSize} */}
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          total Revenue
          {/* {spendingsData.totalRevenue} */}
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
