"use client";
import Link from "next/link";
import React from "react";
import Header from "../../../components/Header/Header";
import BurnCodeWrap from "../../../components/burnCode/BurnCodeWrap";
import HeaderGrid from "@/app/components/HeaderGrid";
import CreateNewCampaign from "@/app/components/Dashboard/CreateNewCampaign";

const Page = () => {
  return (
    <>
      <HeaderGrid>
        <Header props={"Burn a Code"} />
        <CreateNewCampaign />
      </HeaderGrid>
      <BurnCodeWrap />
    </>
  );
};

export default Page;
