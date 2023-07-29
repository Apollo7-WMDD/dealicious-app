"use client";

// react imports
import { useState } from "react";

// next imports
import Link from "next/link";

// mui imports
import { Button, Box, useTheme, Typography } from "@mui/material";

// components imports
import CreateNewCampaign from "@/app/components/Dashboard/CreateNewCampaign";
import Header from "@/app/components/Header/Header";
import SubHeader from "@/app/components/Header/SubHeader";
import ChartCard from "@/app/components/Card/ChartCard";
import ChartCardTitle from "@/app/components/Chart/ChartCardTitle";
import MainGrid from "@/app/components/MainGrid";
import HeaderGrid from "@/app/components/HeaderGrid";
// ? StackDoughNut is not working if not import DoughnutChart_NumCustomer before it due to 'arc' register issue
import DoughnutChart_NumCustomer from "@/app/components/Chart/DoughnutChart_NumCustomer";
import StackDougnNutSpan1 from "@/app/components/Chart/StackDougnNutSpan1";
import LineChart from "@/app/components/Chart/LineChart";
import CampaignGrid from "@/app/components/Dashboard/CampaignGrid";
import UpcomingCampaignGrid from "@/app/components/Dashboard/UpcomingCampaignGrid";

import HilightWrap from "@/app/components/Dashboard/HilightWrap";

const Page = () => {
  const theme = useTheme();

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
        <HeaderGrid>
          <Header props={"Campaigns"} />
          <CreateNewCampaign />
        </HeaderGrid>

        <SubHeader props={"Ongoing campaigns"} />
        <MainGrid isComparing={false}>
          <ChartCard gridColumn={"span 1"}>
            <ChartCardTitle text={"Overview"} pinStatus={""}></ChartCardTitle>
            <StackDougnNutSpan1></StackDougnNutSpan1>
          </ChartCard>

          <ChartCard gridColumn={"2/-1"}>
            <ChartCardTitle
              text={"Hilighted Campaigns"}
              pinStatus={true}
              showPin={true}
            ></ChartCardTitle>

            {hilighted._id != undefined ? (
              <div style={{ width: "100%" }}>
                <div>
                  <Typography variant="h5">{hilighted.name}</Typography>

                  <p
                    style={{
                      margin: "0",
                      fontWeight: "lighter",
                    }}
                  >
                    Item: {hilighted.offer}
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "lighter",
                    }}
                  >
                    Duration:{" "}
                    {new Date(hilighted.startDate)
                      .toISOString()
                      .substring(0, 10)}{" "}
                    to{" "}
                    {new Date(hilighted.endDate).toISOString().substring(0, 10)}
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "lighter",
                    }}
                  >
                    Users: {hilighted.allowNewCustomer ? "New Customers" : ""}
                    {hilighted.allowNewCustomer && hilighted.allowSuperCustomer
                      ? " & "
                      : ""}
                    {hilighted.allowSuperCustomer ? "Super Customers" : ""}
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "lighter",
                    }}
                  >
                    Condition: {hilighted.description}
                  </p>
               
                  <LineChart></LineChart>
                </div>
              </div>
            ) : (
              <HilightWrap></HilightWrap>
            )}
          </ChartCard>

          {/* //* ONGOING CAMPAIGN GRID */}
          <CampaignGrid onPinClickB={onPinClickA}></CampaignGrid>

          {/* //* UPCOMING CAMPAIGN */}
          <SubHeader props={"Upcoming campaigns"} id={"upcoming"} />
          <UpcomingCampaignGrid></UpcomingCampaignGrid>
        </MainGrid>
      </Box>
    </>
  );
};

export default Page;
