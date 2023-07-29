"use client";

import { useEffect } from "react";
import Header from "@/app/components/Header/Header";

import ChartCard from "@/app/components/Card/ChartCard";
import MainGrid from "@/app/components/MainGrid";
import DoughnutChart_NumCustomer from "../../../../../components/Chart/DoughnutChart_NumCustomer";
import LineChart from "../../../../../components/Chart/LineChart";
import BarChart from "../../../../../components/Chart/BarChart";
import StackDoughNut from "../../../../../components/Chart/StackDoughNut";
import ChartCardTitle from "../../../../../components/Chart/ChartCardTitle";

import AverageBill from "../../../../../components/Chart/AverageBill";
import CustomerSpending from "@/app/components/Chart/CustomerSpending";
import { fetchTotalRevenue } from "@/lib/fetching/insights/data";
import SingleLineChart from "@/app/components/Chart/SingleLineChart";

import InputSubtitleDropdown from "@/app/components/Input/InputSubtitleDropdown";

const Page = async () => {
  return (
    <>
      <Header props={"Insights"} />
      <InputSubtitleDropdown />

      {/*====== SET GRID ======*/}
      <MainGrid isComparing={false}>
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
          <ChartCardTitle text={"To improve:"} pinStatus={""}></ChartCardTitle>
          <BarChart></BarChart>
        </ChartCard>
        <ChartCard gridColumn={"span 2"}>
          <ChartCardTitle
            text={"Top Campaigns"}
            pinStatus={""}
          ></ChartCardTitle>
          <StackDoughNut></StackDoughNut>
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          <ChartCardTitle text={"Average Bill"} pinStatus={""}></ChartCardTitle>
          <AverageBill></AverageBill>
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          <ChartCardTitle
            text={"Total Revenue"}
            pinStatus={""}
          ></ChartCardTitle>
          <SingleLineChart
            fetchDataSource={fetchTotalRevenue}
            showTextSource={(data) => `$ ${Math.round(data.totalRevenue)}`}
          />
        </ChartCard>

        <ChartCard gridColumn={"span 1"}>
          <ChartCardTitle
            text={"Customer Spending"}
            pinStatus={""}
          ></ChartCardTitle>
          <CustomerSpending></CustomerSpending>
        </ChartCard>
      </MainGrid>
    </>
  );
};

export default Page;
