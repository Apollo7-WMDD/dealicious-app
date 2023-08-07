"use client";
import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";
import BarChart from "@/app/components/Chart/BarChart";
import CreateNewCampaign from "@/app/components/Dashboard/CreateNewCampaign";
import Header from "@/app/components/Header/Header";
import SubHeader from "@/app/components/Header/SubHeader";
import ChartCard from "@/app/components/Card/ChartCard";
import ChartCardTitle from "@/app/components/Chart/ChartCardTitle";
import MainGrid from "@/app/components/MainGrid";
import HeaderGrid from "@/app/components/HeaderGrid";
import { useStore } from "@/lib/context/user_context/store";
import DoughnutChart_NumCustomer from "@/app/components/Chart/DoughnutChart_NumCustomer";
import CustomerSpending from "@/app/components/Chart/CustomerSpending";

import DoughnutChart_Single_Point from "@/app/components/Chart/DoughnutChart_Single_Point";

const Page = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { restaurantOwnerId, restaurantId } = useStore();
  const [hilighted, setHilighted] = useState({});

  const onPinClickA = (hilighted) => {
    setHilighted(hilighted);
  };
  return (
    <>
      <Box
        sx={{
          // display: "flex",
          justifyContent: "space-between",
        }}
      >
        {isNonMobile ? (
          <HeaderGrid>
            <Header props={"Insights"} />
            <CreateNewCampaign />
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

        <SubHeader props={"Customer Data In Depth"} />
        <MainGrid isComparing={false}>
          <ChartCard gridColumn={"span 2"}>
            <ChartCardTitle
              text={"Customer Spending"}
              pinStatus={""}
            ></ChartCardTitle>
            <CustomerSpending></CustomerSpending>
          </ChartCard>

          <ChartCard gridColumn={"span 1"}>
            <ChartCardTitle
              text={"To improve:"}
              pinStatus={""}
            ></ChartCardTitle>
            <BarChart></BarChart>
          </ChartCard>

          <ChartCard gridColumn={"span 1"}>
            <ChartCardTitle text={"Number of:"} pinStatus={""}></ChartCardTitle>
            <DoughnutChart_NumCustomer></DoughnutChart_NumCustomer>
          </ChartCard>

          <ChartCard gridColumn={"span 1"}>
            <ChartCardTitle text={"Points"} pinStatus={""}></ChartCardTitle>
            <DoughnutChart_Single_Point
              restaurantOwnerId={restaurantOwnerId}
            ></DoughnutChart_Single_Point>
          </ChartCard>
        </MainGrid>
      </Box>
    </>
  );
};

export default Page;
