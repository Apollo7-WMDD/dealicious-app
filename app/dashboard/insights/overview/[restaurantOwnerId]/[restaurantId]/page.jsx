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
import SubHeader from "@/app/components/Header/SubHeader";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import { useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import Image from "next/image";
import CreateNewCampaign from "@/app/components/Dashboard/CreateNewCampaign";
import HeaderGrid from "@/app/components/HeaderGrid";


const Page = async () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <>
      {isNonMobile ? (
        <HeaderGrid>
          <Header props={"Insights"} />
          {/* <CreateNewCampaign /> */}
        </HeaderGrid>
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "1.5rem",
            }}
          >
            <Box>
              <Image src="/logo.png" alt="logo" width={100} height={100} />
            </Box>
            <CreateNewCampaign />
          </Box>
          <Header props={"Insights"} />
        </Box>
      )}


      <Header props={"Insights"} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <InputSubtitleDropdown />
        </Grid>
        <Grid item xs={12} md={4}>
          <Hidden smDown>
            <SubHeader>Customer Data</SubHeader>
          </Hidden>
        </Grid>
      </Grid>

      {/*====== SET GRID ======*/}
      <MainGrid isComparing={false}>
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
          <ChartCardTitle text={"Average Bill"} pinStatus={""}></ChartCardTitle>
          <AverageBill></AverageBill>
        </ChartCard>

        <ChartCard gridColumn={"span 1"}>
          <ChartCardTitle
            text={"Customer Spending"}
            pinStatus={""}
          ></ChartCardTitle>
          <CustomerSpending></CustomerSpending>
        </ChartCard>

        {/* Second row */}
        <ChartCard gridColumn={"span 2"}>
          <ChartCardTitle
            text={"Customer Campaign Usage By Time"}
            pinStatus={""}
          ></ChartCardTitle>
          <LineChart></LineChart>
        </ChartCard>

        <ChartCard gridColumn={"span 1"}>
          <ChartCardTitle text={"Number of:"} pinStatus={""}></ChartCardTitle>
          <DoughnutChart_NumCustomer></DoughnutChart_NumCustomer>
        </ChartCard>

        {/* Third row */}
        <ChartCard gridColumn={"span 2"}>
          <ChartCardTitle
            text={"Top Campaigns"}
            pinStatus={""}
          ></ChartCardTitle>
          <StackDoughNut></StackDoughNut>
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          <ChartCardTitle text={"To improve:"} pinStatus={""}></ChartCardTitle>
          <BarChart></BarChart>
        </ChartCard>
      </MainGrid>
    </>
  );
};

export default Page;
