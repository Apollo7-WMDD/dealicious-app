"use client";
import Link from "next/link";
import { Box  } from '@mui/material';
import { useState } from "react";
import Header from "../../../components/Header/Header";
import BurnCodeWrap from "../../../components/burnCode/BurnCodeWrap";
import HeaderGrid from "@/app/components/HeaderGrid";
import CreateNewCampaign from "@/app/components/Dashboard/CreateNewCampaign";

const Page = () => {
  const [render, setRender] = useState(false);
  return (
    <Box sx={{minHeight:"100vh"}}>
      <HeaderGrid>
        <Header props={"Burn a Code"} />
        {/* <CreateNewCampaign /> */}
      </HeaderGrid>
      <BurnCodeWrap
        key={render ? "render" : "not-render"}
        render={render}
        setRender={setRender}
      />
    </Box>
  );
};

export default Page;
