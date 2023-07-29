"use client";
import { Box, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import Header from "@/app/components/Header/Header";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/context/user_context/store";
import { useRouter } from "next/navigation";
import InputSubtitleDropdown from "@/app/components/Input/InputSubtitleDropdown";
import MainGrid from "@/app/components/MainGrid";
import ChartCard from "@/app/components/Card/ChartCard";
import ChartCardTitle from "@/app/components/Chart/ChartCardTitle";
import DoughnutChart_Single_NumCustomer from "@/app/components/Chart/DoughnutChart_Single_NumCustomer";
import DoughnutChart_Single_SpendingCustomer from "@/app/components/Chart/DoughnutChart_Single_SpendingCustomer";
import SingleButtonVariant from "@/app/components/Button/SingleButtonVariant";
import { useTheme } from "@emotion/react";
import HeaderGrid from "@/app/components/HeaderGrid";
import SingleLineChart from "@/app/components/Chart/SingleLineChart";
import AverageBill from "@/app/components/Chart/AverageBill";
import DoughnutChart_Single_Point from "@/app/components/Chart/DoughnutChart_Single_Point";

// fetch imports
import { fetchAllCampaigns } from "@/lib/fetching/campaigns/data";

import Loader from "@/app/components/Loader";
import LineChart from "@/app/components/Chart/LineChart";

const Page = async () => {
  const { restaurantOwnerId, restaurantId } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const campaignId = pathname.split("/")[6];
  const [dataArray, setDataArray] = useState([]);
  const [subTitle, setSubTitle] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [isComparing, setIsComparing] = useState(false);
  const [campaignCompare, setCampaignCompare] = useState("");

  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchAllCampaigns(restaurantOwnerId);
        const filteredResult = result.campaigns.filter(
          (e) => e._id === campaignId
        );
        setDataArray(filteredResult[0] || []);
        setSubTitle(filteredResult[0].name);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isComparing]);

  const onClick = () => {
    router.push(`/dashboard/campaigns/recreate/${campaignId}`);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <HeaderGrid>
            <Header props={"Insights"} />
            <SingleButtonVariant
              text={"Recreate a Campaign"}
              onClick={onClick}
              width={"350px"}
            />
          </HeaderGrid>
          <InputSubtitleDropdown text={subTitle} />
          <MainGrid>
            <ChartCard gridColumn={"span 2"}>
              <ChartCardTitle text={"Total Revenue"}></ChartCardTitle>
              <LineChart></LineChart>
            </ChartCard>
            <ChartCard gridColumn={"span 1"}>
              <ChartCardTitle
                text={"Number of:"}
                pinStatus={""}
              ></ChartCardTitle>

              <DoughnutChart_Single_NumCustomer
                campaignId={campaignId}
              ></DoughnutChart_Single_NumCustomer>
            </ChartCard>
            <ChartCard gridColumn={"span 1"}>
              <ChartCardTitle
                text={"Customer Spending"}
                pinStatus={""}
              ></ChartCardTitle>

              <DoughnutChart_Single_SpendingCustomer
                campaignId={campaignId}
              ></DoughnutChart_Single_SpendingCustomer>
            </ChartCard>
          </MainGrid>
        </>
      )}
    </>
  );
};

export default Page;
