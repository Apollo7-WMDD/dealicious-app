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
import Image from "next/image";

// fetch imports
import { fetchAllCampaigns } from "@/lib/fetching/campaigns/data";
import {
  fetchTotalRevenueSingle,
  fetchCustomerCampaignTimeSingle,
  fetchNCbecameSC,
} from "@/lib/fetching/insights/data";

import Loader from "@/app/components/Loader";
import LineChart from "@/app/components/Chart/LineChart";
import { useMediaQuery } from "@mui/material";
import DoughnutChart_NumCustomer from "@/app/components/Chart/DoughnutChart_NumCustomer";
import Carousel from "@/app/components/Card/Carousel";


const Page = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isMobile = !isNonMobile;
  const { restaurantOwnerId, restaurantId } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const campaignId = pathname.split("/")[6];
  const [dataArray, setDataArray] = useState([]);
  const [subTitle, setSubTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isComparing, setIsComparing] = useState(false);
  const [campaignCompare, setCampaignCompare] = useState("");
  const [campaignName, setCampaignName] = useState("Compare with:");

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
        console.log('filteredResult:', filteredResult);
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "90vh",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          {isNonMobile ? (
            <HeaderGrid>
              <Header props={"Insights"} />
              {/* <CreateNewCampaign /> */}
              <SingleButtonVariant
                text={isNonMobile ? "Recreate a Campaign" : ""}
                onClick={onClick}
                width={"350px"}
              />
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
                {/* <CreateNewCampaign /> */}
                <SingleButtonVariant
                  text={isNonMobile ? "Recreate a Campaign" : ""}
                  onClick={onClick}
                  width={"350px"}
                />
              </Box>
              <Header props={"Insights"} />
            </Box>
          )}

          
            <InputSubtitleDropdown 
              text={subTitle}
              setIsComparing={setIsComparing}
              setCampaignCompare={setCampaignCompare}
              isComparing={isComparing}
              campaignName={campaignName}
              setCampaignName={setCampaignName}
            />
          
         <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isComparing
                ? "1fr auto 1fr"
                : "repeat(1, 1fr)",
              gap: "1rem",
              gridAutoFlow: "row dense",
              // margin: "1.5rem 0",
              [theme.breakpoints.down("lg")]: {
                gridTemplateColumns: "repeat(2, 1fr)",
              },
              [theme.breakpoints.down("md")]: {
                gridTemplateColumns: "repeat(1, 1fr)",
              },
            }}
          >
            <MainGrid
              key={isComparing ? "comparing" : "not-comparing"}
              isComparing={isComparing}
            >
              {isComparing && isMobile ? (
                <Carousel>
                  <ChartCard gridColumn={isComparing ? "span 1" : "span 2"}>
                <ChartCardTitle text={"Total Revenue"}></ChartCardTitle>
                <div style={{ minHeight: "250px", width: "100%" }}>
                  <SingleLineChart
                    fetchDataSource={fetchTotalRevenueSingle}
                    showTextSource={
                      (data) => `$ ${dataArray.spending}`
                    }
                    campaignId={campaignId}
                  />
                </div>
              </ChartCard>
              <ChartCard gridColumn={isComparing ? "span 1" : "span 2"}>
                <ChartCardTitle
                  text={"Customer Campaign Usage By Time"}
                ></ChartCardTitle>
                <div style={{ minHeight: "250px", width: "100%" }}>
                  <SingleLineChart
                    fetchDataSource={fetchCustomerCampaignTimeSingle}
                    showTextSource={
                      (data) => `${Math.round(data.totalUsageAmount)}`
                    }
                    campaignId={campaignId}
                  />
                </div>
              </ChartCard>
              <ChartCard gridColumn={"span 1"}>
                <ChartCardTitle
                  text={"Number of:"}
                  pinStatus={""}
                ></ChartCardTitle>
                <div style={{ minHeight: "350px", width: "100%" }}>
                  <DoughnutChart_Single_NumCustomer
                    campaignId={campaignId}
                  ></DoughnutChart_Single_NumCustomer>
                </div>
              </ChartCard>

              <ChartCard gridColumn={"span 1"}>
                <ChartCardTitle text={"Points"} pinStatus={""}></ChartCardTitle>
                <div style={{ minHeight: "350px", width: "100%" }}>
                  <DoughnutChart_Single_Point
                    restaurantOwnerId={restaurantOwnerId}
                  ></DoughnutChart_Single_Point>
                </div>
              </ChartCard>
              <ChartCard gridColumn={"span 1"}>
                <ChartCardTitle
                  text={"NC that became SCs"}
                  pinStatus={""}
                ></ChartCardTitle>
                <div style={{ minHeight: "350px", width: "100%" }}>
                  <SingleLineChart
                    fetchDataSource={fetchNCbecameSC}
                    showTextSource={
                      (data) => `${Math.round(data.totalUserAmount)}`
                    }
                    campaignId={campaignId}
                  />
                </div>
              </ChartCard>

              <ChartCard gridColumn={"span 1"}>
                <ChartCardTitle
                  text={"Customer Spending"}
                  pinStatus={""}
                ></ChartCardTitle>
                <div style={{ minHeight: "350px", width: "100%" }}>
                  <DoughnutChart_Single_SpendingCustomer
                    campaignId={campaignId}
                  ></DoughnutChart_Single_SpendingCustomer>
                </div>
              </ChartCard>
              <ChartCard gridColumn={"span 1"}>
                <ChartCardTitle
                  text={"Average Bill"}
                  pinStatus={""}
                ></ChartCardTitle>
                <div style={{ minHeight: "350px", width: "100%" }}>
                  <AverageBill campaignId={campaignId}></AverageBill>
                </div>
              </ChartCard>
                </Carousel>
              ) : (
                <>
                  <ChartCard gridColumn={isComparing ? "span 1" : "span 2"}>
                <ChartCardTitle text={"Total Revenue"}></ChartCardTitle>
                <div style={{ minHeight: "250px", width: "100%" }}>
                  <SingleLineChart
                    fetchDataSource={fetchTotalRevenueSingle}
                    showTextSource={
                      // dataArray.spending
                      (data) => `$ ${dataArray.spending}`
                    }
                    campaignId={campaignId}
                  />
                </div>
              </ChartCard>
              <ChartCard gridColumn={isComparing ? "span 1" : "span 2"}>
                <ChartCardTitle
                  text={"Customer Campaign Usage By Time"}
                ></ChartCardTitle>
                <div style={{ minHeight: "250px", width: "100%" }}>
                  <SingleLineChart
                    fetchDataSource={fetchCustomerCampaignTimeSingle}
                    showTextSource={
                      (data) => `${Math.round(data.totalUsageAmount)}`
                    }
                    campaignId={campaignId}
                  />
                </div>
              </ChartCard>
              <ChartCard gridColumn={"span 1"}>
                <ChartCardTitle
                  text={"Number of:"}
                  pinStatus={""}
                ></ChartCardTitle>
                <div style={{ minHeight: "350px", width: "100%" }}>
                  <DoughnutChart_Single_NumCustomer
                    campaignId={campaignId}
                  ></DoughnutChart_Single_NumCustomer>
                </div>
              </ChartCard>

              <ChartCard gridColumn={"span 1"}>
                <ChartCardTitle text={"Points"} pinStatus={""}></ChartCardTitle>
                <div style={{ minHeight: "350px", width: "100%" }}>
                  <DoughnutChart_Single_Point
                    restaurantOwnerId={restaurantOwnerId}
                  ></DoughnutChart_Single_Point>
                </div>
              </ChartCard>
              <ChartCard gridColumn={"span 1"}>
                <ChartCardTitle
                  text={"NC that became SCs"}
                  pinStatus={""}
                ></ChartCardTitle>
                <div style={{ minHeight: "350px", width: "100%" }}>
                  <SingleLineChart
                    fetchDataSource={fetchNCbecameSC}
                    showTextSource={
                      (data) => `${Math.round(data.totalUserAmount)}`
                    }
                    campaignId={campaignId}
                  />
                </div>
              </ChartCard>

              <ChartCard gridColumn={"span 1"}>
                <ChartCardTitle
                  text={"Customer Spending"}
                  pinStatus={""}
                ></ChartCardTitle>
                <div style={{ minHeight: "350px", width: "100%" }}>
                  <DoughnutChart_Single_SpendingCustomer
                    campaignId={campaignId}
                  ></DoughnutChart_Single_SpendingCustomer>
                </div>
              </ChartCard>
              <ChartCard gridColumn={"span 1"}>
                <ChartCardTitle
                  text={"Average Bill"}
                  pinStatus={""}
                ></ChartCardTitle>
                <div style={{ minHeight: "350px", width: "100%" }}>
                  <AverageBill campaignId={campaignId}></AverageBill>
                </div>
              </ChartCard>
                </>
              )}
            </MainGrid>
            {isComparing && (
              <>
                {isNonMobile && (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2"
                      height="2386"
                      viewBox="0 0 2 2386"
                      fill="none"
                    >
                      <path
                        opacity="0.1"
                        d="M1 0L0.999899 2386"
                        stroke="url(#paint0_linear_1280_27880)"
                        stroke-width="2"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1280_27880"
                          x1="1.5"
                          y1="2.11961e-08"
                          x2="1.4999"
                          y2="2386"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop />
                          <stop offset="0.609375" stop-opacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                )}
                <MainGrid isComparing={isComparing} key={campaignCompare}>
                {isComparing && isMobile ? (
                  <Carousel>
                   <ChartCard gridColumn={isComparing ? "span 1" : "span 2"}>
                    <ChartCardTitle text={"Total Revenue"}></ChartCardTitle>
                    <div style={{ minHeight: "250px", width: "100%" }}>
                      <SingleLineChart
                        fetchDataSource={fetchTotalRevenueSingle}
                        showTextSource={
                        //  `$ 0.9k`
                          (data) => `$ 0.9k`
                        }
                        campaignId={campaignId}
                      />
                    </div>
                  </ChartCard>
                  <ChartCard gridColumn={isComparing ? "span 1" : "span 2"}>
                    <ChartCardTitle
                      text={"Customer Campaign Usage By Time"}
                    ></ChartCardTitle>
                    <div style={{ minHeight: "250px", width: "100%" }}>
                      <SingleLineChart
                        fetchDataSource={fetchCustomerCampaignTimeSingle}
                        showTextSource={
                          (data) => `55`
                        }
                        campaignId={campaignId}
                      />
                    </div>
                  </ChartCard>

                  <ChartCard gridColumn={"span 1"}>
                    <ChartCardTitle
                      text={"Number of:"}
                      pinStatus={""}
                    ></ChartCardTitle>
                    <div style={{ minHeight: "350px", width: "100%" }}>
                      <DoughnutChart_Single_NumCustomer
                        campaignId={campaignCompare}
                      ></DoughnutChart_Single_NumCustomer>
                    </div>
                  </ChartCard>

                  <ChartCard gridColumn={"span 1"}>
                    <ChartCardTitle
                      text={"Points"}
                      pinStatus={""}
                    ></ChartCardTitle>
                    <div style={{ minHeight: "350px", width: "100%" }}>
                      <DoughnutChart_Single_Point
                        restaurantOwnerId={restaurantOwnerId}
                      ></DoughnutChart_Single_Point>
                    </div>
                  </ChartCard>
                  <ChartCard gridColumn={"span 1"}>
                    <ChartCardTitle
                      text={"NC that became SCs"}
                      pinStatus={""}
                    ></ChartCardTitle>
                    <div style={{ minHeight: "350px", width: "100%" }}>
                      <SingleLineChart
                        fetchDataSource={fetchNCbecameSC}
                        showTextSource={
                          (data) => `32`
                        }
                        campaignId={campaignId}
                      />
                    </div>
                  </ChartCard>

                  <ChartCard gridColumn={"span 1"}>
                    <ChartCardTitle
                      text={"Customer Spending"}
                      pinStatus={""}
                    ></ChartCardTitle>
                    <div style={{ minHeight: "350px", width: "100%" }}>
                      <DoughnutChart_Single_SpendingCustomer
                        campaignId={campaignCompare}
                      ></DoughnutChart_Single_SpendingCustomer>
                    </div>
                  </ChartCard>

                  <ChartCard gridColumn={"span 1"}>
                    <ChartCardTitle
                      text={"Average Bill"}
                      pinStatus={""}
                    ></ChartCardTitle>
                    <div style={{ minHeight: "350px", width: "100%" }}>
                      <AverageBill campaignId={campaignCompare}></AverageBill>
                    </div>
                  </ChartCard>
                  </Carousel>
                ) : (
                  <>
                   <ChartCard gridColumn={isComparing ? "span 1" : "span 2"}>
                    <ChartCardTitle text={"Total Revenue"}></ChartCardTitle>
                    <div style={{ minHeight: "250px", width: "100%" }}>
                      <SingleLineChart
                        fetchDataSource={fetchTotalRevenueSingle}
                        showTextSource={
                        //  `$ 0.9k`
                          (data) => `$ 0.9k`
                        }
                        campaignId={campaignId}
                      />
                    </div>
                  </ChartCard>
                  <ChartCard gridColumn={isComparing ? "span 1" : "span 2"}>
                    <ChartCardTitle
                      text={"Customer Campaign Usage By Time"}
                    ></ChartCardTitle>
                    <div style={{ minHeight: "250px", width: "100%" }}>
                      <SingleLineChart
                        fetchDataSource={fetchCustomerCampaignTimeSingle}
                        showTextSource={
                          (data) => `55`
                        }
                        campaignId={campaignId}
                      />
                    </div>
                  </ChartCard>

                  <ChartCard gridColumn={"span 1"}>
                    <ChartCardTitle
                      text={"Number of:"}
                      pinStatus={""}
                    ></ChartCardTitle>
                    <div style={{ minHeight: "350px", width: "100%" }}>
                      <DoughnutChart_Single_NumCustomer
                        campaignId={campaignCompare}
                      ></DoughnutChart_Single_NumCustomer>
                    </div>
                  </ChartCard>

                  <ChartCard gridColumn={"span 1"}>
                    <ChartCardTitle
                      text={"Points"}
                      pinStatus={""}
                    ></ChartCardTitle>
                    <div style={{ minHeight: "350px", width: "100%" }}>
                      <DoughnutChart_Single_Point
                        restaurantOwnerId={restaurantOwnerId}
                      ></DoughnutChart_Single_Point>
                    </div>
                  </ChartCard>
                  <ChartCard gridColumn={"span 1"}>
                    <ChartCardTitle
                      text={"NC that became SCs"}
                      pinStatus={""}
                    ></ChartCardTitle>
                    <div style={{ minHeight: "350px", width: "100%" }}>
                      <SingleLineChart
                        fetchDataSource={fetchNCbecameSC}
                        showTextSource={
                          (data) => `32`
                        }
                        campaignId={campaignId}
                      />
                    </div>
                  </ChartCard>

                  <ChartCard gridColumn={"span 1"}>
                    <ChartCardTitle
                      text={"Customer Spending"}
                      pinStatus={""}
                    ></ChartCardTitle>
                    <div style={{ minHeight: "350px", width: "100%" }}>
                      <DoughnutChart_Single_SpendingCustomer
                        campaignId={campaignCompare}
                      ></DoughnutChart_Single_SpendingCustomer>
                    </div>
                  </ChartCard>

                  <ChartCard gridColumn={"span 1"}>
                    <ChartCardTitle
                      text={"Average Bill"}
                      pinStatus={""}
                    ></ChartCardTitle>
                    <div style={{ minHeight: "350px", width: "100%" }}>
                      <AverageBill campaignId={campaignCompare}></AverageBill>
                    </div>
                  </ChartCard>
                  </>
                )}
                </MainGrid>
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default Page;
