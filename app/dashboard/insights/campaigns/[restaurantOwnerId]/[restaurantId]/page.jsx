"use client";
import { useState } from "react";
import HeaderGrid from "@/app/components/HeaderGrid";
import Header from "@/app/components/Header/Header";
import CreateNewCampaign from "@/app/components/Dashboard/CreateNewCampaign";
import SubHeader from "@/app/components/Header/SubHeader";
import MainGrid from "@/app/components/MainGrid";
import ChartCard from "@/app/components/Card/ChartCard";
import CampaignGrid_All from "@/app/components/Dashboard/CampaignGrid_All";
import { useMediaQuery,useTheme } from "@mui/material";
import { Box } from "@mui/material";
import Image from "next/image";

const Page = async () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <>
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

      {/* <HeaderGrid>
        <Header props={"Insights"} />
        <CreateNewCampaign />
      </HeaderGrid> */}
      <SubHeader props={"Select a Campaigns"} />
      <MainGrid isComparing={false}>
        <CampaignGrid_All />
      </MainGrid>
    </>
  );
};

export default Page;
