"use client"
import Link from "next/link";
import HeaderGrid from "@/app/components/HeaderGrid";
import Header from "@/app/components/Header/Header";
import CreateNewCampaign from "@/app/components/Dashboard/CreateNewCampaign";
import SubHeader from "@/app/components/Header/SubHeader";

const Page = async () => {
  return (
    <>
      <HeaderGrid>
        <Header props={"Insights"} />
        <CreateNewCampaign />
      </HeaderGrid>
      <SubHeader props={"Select a Campaigns"} />
    </>
  );
};

export default Page;
