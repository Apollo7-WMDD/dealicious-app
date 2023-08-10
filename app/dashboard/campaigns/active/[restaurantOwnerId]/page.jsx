"use client";

// react imports
import { useState } from "react";

// next imports
import Link from "next/link";

// mui imports
import { Button, Box, useTheme, Typography } from "@mui/material";

// components imports
import Image from "next/image";
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
import { useMediaQuery } from "@mui/material";
import { fetchTotalRevenueSingle } from "@/lib/fetching/insights/data";
import SingleLineChart from "@/app/components/Chart/SingleLineChart";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [hilighted, setHilighted] = useState({});

  const onPinClickA = (hilighted) => {
    router.push("#hilighted");
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
            <Header props={"Campaigns"} />
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
            <Header props={"Campaigns"} />
          </Box>
        )}

        <SubHeader props={"Ongoing campaigns"} />
        <MainGrid isComparing={false}>
          <ChartCard gridColumn={"span 1"}>
            <ChartCardTitle text={"Overview"} pinStatus={""}></ChartCardTitle>
            <StackDougnNutSpan1></StackDougnNutSpan1>
          </ChartCard>

          <ChartCard gridColumn={"2/-1"}>
            <div id={"hilighted"}></div>
            <ChartCardTitle
              text={"Highlighted Campaigns"}
              pinStatus={true}
              showPin={true}
            ></ChartCardTitle>

            {hilighted._id != undefined ? (
              <div style={{ width: "100%" }}>
                <div>
                  <Typography variant="h5" sx={{ mt: "1rem" }}>
                    {hilighted.name}
                  </Typography>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "bold",
                    }}
                  >
                    Item:
                    <p
                      style={{
                        margin: "0",
                        fontWeight: "lighter",
                        display: "inline",
                      }}
                    >
                      {" "}
                      {hilighted.offer}
                    </p>
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "bold",
                    }}
                  >
                    Duration:
                    <p
                      style={{
                        margin: "0",
                        fontWeight: "lighter",
                        display: "inline",
                      }}
                    >
                      {" "}
                      {new Date(hilighted.startDate)
                        .toISOString()
                        .substring(0, 10)}{" "}
                      to{" "}
                      {new Date(hilighted.endDate)
                        .toISOString()
                        .substring(0, 10)}
                    </p>
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "bold",
                    }}
                  >
                    Users:
                    <p
                      style={{
                        margin: "0",
                        fontWeight: "lighter",
                        display: "inline",
                      }}
                    >
                      {" "}
                      {hilighted.allowNewCustomer ? "New Customers" : ""}
                      {hilighted.allowNewCustomer &&
                      hilighted.allowSuperCustomer
                        ? " & "
                        : ""}
                      {hilighted.allowSuperCustomer ? "Super Customers" : ""}
                    </p>
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "bold",
                    }}
                  >
                    Condition:
                    <p
                      style={{
                        margin: "0",
                        fontWeight: "lighter",
                        display: "inline",
                      }}
                    >
                      {" "}
                      {hilighted.description}
                    </p>
                  </p>
                  <Typography
                    variant="h5"
                    sx={{ mt: "1rem", textAlign: "center" }}
                  >
                    Campaign revenue
                  </Typography>
                  <SingleLineChart
                    fetchDataSource={fetchTotalRevenueSingle}
                    showTextSource={(data) => `$ ${hilighted.spending}`}
                    campaignId={hilighted?._id}
                    sourceType="fetchTotalRevenueSingle"
                  />
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
