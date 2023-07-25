"use client";
import {Box, Typography  } from '@mui/material';
import { usePathname } from "next/navigation";
import Header from "@/app/components/Header/Header";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/context/user_context/store";
import { useRouter } from "next/navigation";
import InputSubtitleDropdown from "@/app/components/Input/InputSubtitleDropdown";
import MainGrid from "@/app/components/MainGrid";
import LineChart from "@/app/components/Chart/LineChart";
import ChartCard from "@/app/components/Card/ChartCard";
import ChartCardTitle from "@/app/components/Chart/ChartCardTitle";
import DoughnutChart_Single_NumCustomer from "@/app/components/Chart/DoughnutChart_Single_NumCustomer";
import DoughnutChart_Single_SpendingCustomer from "@/app/components/Chart/DoughnutChart_Single_SpendingCustomer";
import SingleButton from '@/app/components/Button/SingleButton';
// fetch imports
import { fetchAllCampaigns } from "@/lib/fetching/campaigns/data";
import HeaderGrid from '@/app/components/HeaderGrid';


const Page = async () => {
  const { restaurantOwnerId, restaurantId } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const campaignId = pathname.split("/")[6];
  const [dataArray, setDataArray] = useState([]);
  const [subTitle, setSubTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAllCampaigns(restaurantOwnerId);
      const filteredResult = result.campaigns.filter(
        (e) => e._id === campaignId
      );
      setDataArray(filteredResult[0] || []);
      setSubTitle(filteredResult[0].name);
    };
    fetchData();
  }, []);

  console.log(dataArray);

  const onClick = () => {
    router.push(`/dashboard/campaigns/recreate/${campaignId}`);
  };

  return (
    <>
      <HeaderGrid>
        <Header props={"Insights"} />
        <SingleButton text={"Recreate a Campaign"} onClick={onClick} width={"350px"} />
      </HeaderGrid>
      <InputSubtitleDropdown text={subTitle} />
      <MainGrid>
        <ChartCard gridColumn={"span 2"}>
          <ChartCardTitle text={"Total Revenue"}></ChartCardTitle>
          {/* <Box>
            <Typography variant="h3">{dataArray.name}</Typography>
          </Box> */}
          <LineChart></LineChart>
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          <ChartCardTitle text={"Number of:"} pinStatus={""}></ChartCardTitle>
          <DoughnutChart_Single_NumCustomer campaignId={campaignId}></DoughnutChart_Single_NumCustomer>
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          <ChartCardTitle text={"Customer Spending"} pinStatus={""}></ChartCardTitle>
          <DoughnutChart_Single_SpendingCustomer campaignId={campaignId}></DoughnutChart_Single_SpendingCustomer>
        </ChartCard>
      </MainGrid>
    </>
  );
};

export default Page;

