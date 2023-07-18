"use client";
import Link from "next/link";
import React from "react";
import Header from "../../../components/Header/Header";
import BurnCodeWrap from "../../../components/burnCode/BurnCodeWrap";

const Page = () => {
  return (
    <>
      <Header props={"Burn a Code"} />
      <BurnCodeWrap></BurnCodeWrap>
    </>
  );
};

export default Page;
