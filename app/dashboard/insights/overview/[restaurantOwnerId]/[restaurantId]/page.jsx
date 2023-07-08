"use client";
import Link from "next/link";
import Header from "../../../../../components/Header/Header";
import SubHeader from "../../../../../components/Header/SubHeader";
import ChartCard from "../../../../../components/ChartCard";
import MainGrid from "../../../../../components/MainGrid";
import { Box, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { useMemo, useEffect, useState } from "react";

// import * as d3 from "d3";

const fetchInsightsOverview = async (restaurantOwnerId, restaurantId) => {
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const res = await fetch(
    `${serverUrl}/api/dashboard/insights/overview/${restaurantOwnerId}/${restaurantId}`
    // {
    //   cache: "no-store",
    // }
  );

  if (!res.ok) throw new Error(res.text());

  const data = await res.json();
  console.log("fetch is done");
  return data;
};

const Page = async ({ params }) => {
  const theme = useTheme();
  const { restaurantOwnerId, restaurantId } = params;

  const spendingsData = await fetchInsightsOverview(
    restaurantOwnerId,
    restaurantId
  );
  console.log(spendingsData);
  // const [toBarData, setToBarData] = useState([]);
  // const [formattedData, setFormattedData] = useState([]);
  // useEffect(() => {
  //   const getData = async () => {
  //     const spendingsData = await fetchInsightsOverview(
  //       restaurantOwnerId,
  //       restaurantId
  //     );
  //     setToBarData(spendingsData);
  //     // cleanData()
  //   };
  //   getData();
  // }, []);

  // useEffect(() => {
  //   const cleanData = () => {
  //     console.log("toBarData.opportunities");
  //     console.log(toBarData.opportunities);
  //     for (let key in toBarData.opportunities) {
  //       dataToArray.push({
  //         opportunity: key,
  //         spendings: toBarData.opportunities[key],
  //       });
  //     }
  //     console.log("dataToArray");
  //     console.log(dataToArray);
  //     setFormattedData(dataToArray);
  //   };
  //   cleanData();
  // }, []);

  // const dataToArray = [];
  // const cleanData = () => {
  //   console.log("toBarData.opportunities");
  //   console.log(toBarData.opportunities);
  //   for (let key in toBarData.opportunities) {
  //     dataToArray.push({
  //       opportunity: key,
  //       spendings: toBarData.opportunities[key],
  //     });
  //   }
  //   console.log("dataToArray");
  //   console.log(dataToArray);
  //   // setToBarData(dataToArray);
  // };
  // cleanData();
  // console.log("toBarData");
  // console.log(toBarData);
  // console.log("formattedData");
  // console.log(formattedData);
  // console.log("Object.values(toBarData)[6] ");
  // console.log(Object.values(toBarData)[6]);

  //   const [formattedData] = useMemo(() => {
  //     if (!spendingsData) return [];

  //     // const { opportunities } = spendingsData;
  //     const totalSalesLine = {
  //       id: "totalSales",
  //       color: theme.palette.secondary.main,
  //       data: [],
  //     };
  //     // const totalUnitsLine = {
  //     //   id: "totalUnits",
  //     //   color: theme.palette.secondary[600],
  //     //   data: [],
  //     // };

  //     Object.values(spendingsData).forEach(({  opportunities}) => {

  //         totalSalesLine.data = [
  //           ...totalSalesLine.data,
  //           { x: splitDate, y: totalSales },
  //         ];
  //         // totalUnitsLine.data = [
  //         //   ...totalUnitsLine.data,
  //         //   { x: opportunities},
  //         // ];

  //     });

  //     const formattedData = [totalSalesLine,
  //       //  totalUnitsLine
  //     ];
  //     return [formattedData];
  //   }, [spendingsData]);

  // console.log("formattedData");
  // console.log(formattedData);

  return (
    <>
      <Header props={"Insights"} />
      {/* CHANGE THIS COMPONENT TO DROWDOWN WITH ALL CAMPAIGN AND PINNED CAMPAIGN ON TOP */}
      <SubHeader props={"Campaing Data Overview(All)"} />

      {/*====== SET GRID ======*/}
      <MainGrid>
        {/* <ResponsiveBar
          data={
            [
              { opportunity: "foodQualityCount", spendings: 3 },
              { opportunity: "foodQuantityCount", spendings: 1 },
              { opportunity: "serviceCount", spendings: 1 },
              { opportunity: "placeCount", spendings: 1 },
              { opportunity: "otherCount", spendings: 0 },
            ]
          }
          keys={["spendings"]}
          indexBy="opportunity"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.15}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          // fill={[
          //   {
          //     match: {
          //       id: "fries",
          //     },
          //     id: "dots",
          //   },
          //   {
          //     match: {
          //       id: "sandwich",
          //     },
          //     id: "lines",
          //   },
          // ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          enableGridY={false}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={(e) =>
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          }
        /> */}

        <ChartCard gridColumn={"span 2"} >
          averageBillSize
          {spendingsData.averageBillSize}
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          totalRevenue
          {spendingsData.totalRevenue}
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          nonSuperCustomers
          {spendingsData.customerCount.nonSuperCustomers}
          <br />
          superCustomers
          {spendingsData.customerCount.superCustomers}
        </ChartCard>

        <ChartCard gridColumn={"span 1"}>
          foodQualityCount
          {spendingsData.opportunities.foodQualityCount}
          <br />
          foodQuantityCount
          {spendingsData.opportunities.foodQuantityCount}
          <br />
          placeCount
          {spendingsData.opportunities.placeCount} <br />
          serviceCount
          {spendingsData.opportunities.serviceCount}
          <br />
        </ChartCard>

        <ChartCard gridColumn={"span 2"}>
          nonSuperCustomers
          {spendingsData.customerSpendings.nonSuperCustomers}
          <br />
          superCustomers
          {spendingsData.customerSpendings.superCustomers}
        </ChartCard>
        {spendingsData.topCampaigns.map((item) => (
          <ChartCard gridColumn={"span 1"}>{item.campaignName}</ChartCard>
        ))}
      </MainGrid>
      {/* <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          gridAutoFlow: "row dense"
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            height: "400px",
            width: "1fr",
          }}
        >
          ddd
        </Box>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            height: "400px",
            width: "1fr",
          }}
        >
          333
        </Box>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            height: "400px",
            width: "1fr",
          }}
        >
          321
        </Box>
      </Box> */}
      {/* <ChartCard content={{toBarData}} gridColumn={"span 3"} /> */}

      <Box sx={{ height: "400px" }}></Box>
      <Link href={`/dashboard/campaigns/active/${restaurantOwnerId}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Dashboard
        </button>
      </Link>
      <Link
        href={`/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId}`}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Insights - Campaigns
        </button>
      </Link>
      <Link
        href={`/dashboard/insights/customers/${restaurantOwnerId}/${restaurantId}`}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-4">
          Insights - Customers
        </button>
      </Link>
    </>
  );
};

export default Page;
