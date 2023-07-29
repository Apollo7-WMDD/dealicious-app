"use client";
import { useState } from "react";
import HeaderGrid from "@/app/components/HeaderGrid";
import Header from "@/app/components/Header/Header";
import CreateNewCampaign from "@/app/components/Dashboard/CreateNewCampaign";
import SubHeader from "@/app/components/Header/SubHeader";
import MainGrid from "@/app/components/MainGrid";
import ChartCard from "@/app/components/Card/ChartCard";
import CampaignGrid_All from "@/app/components/Dashboard/CampaignGrid_All";

const Page = async () => {
  // const [hilighted, setHilighted] = useState({});

  // const onPinClickA = (hilighted) => {
  //   setHilighted(hilighted);
  // };
  return (
    <>
      <HeaderGrid>
        <Header props={"Insights"} />
        <CreateNewCampaign />
      </HeaderGrid>
      <SubHeader props={"Select a Campaigns"} />
      <MainGrid isComparing={false}>
        <CampaignGrid_All />
      </MainGrid>
    </>
  );
};

export default Page;
