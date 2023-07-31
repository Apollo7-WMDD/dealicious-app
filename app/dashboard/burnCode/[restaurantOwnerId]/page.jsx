"use client";
import Link from "next/link";
import { useState } from "react";
import Header from "../../../components/Header/Header";
import BurnCodeWrap from "../../../components/burnCode/BurnCodeWrap";
import HeaderGrid from "@/app/components/HeaderGrid";
import CreateNewCampaign from "@/app/components/Dashboard/CreateNewCampaign";

const Page = () => {
  const [render, setRender] = useState(false);
  return (
    <>
      <HeaderGrid>
        <Header props={"Burn a Code"} />
        <CreateNewCampaign />
      </HeaderGrid>
      <BurnCodeWrap
        key={render ? "render" : "not-render"}
        render={render}
        setRender={setRender}
      />
    </>
  );
};

export default Page;
