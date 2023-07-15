"use client";

// react imports
import { useEffect } from "react";

// next imports
import Link from "next/link";

// mui imports
import { Button, Box , useTheme} from "@mui/material";

// components imports
import CreateNewCampaign from "@/app/components/Dashboard/CreateNewCampaign";
import Header from "@/app/components/Header/Header";
import SubHeader from "@/app/components/Header/SubHeader";
import ChartCard from "@/app/components/ChartCard";
import ChartCardTitle from "@/app/components/Chart/ChartCardTitle";
import MainGrid from "@/app/components/MainGrid";
import HeaderGrid from "@/app/components/HeaderGrid";
// ? StackDoughNut is not working if not import DoughnutChart_NumCustomer before it due to 'arc' register issue
import DoughnutChart_NumCustomer from "@/app/components/Chart/DoughnutChart_NumCustomer";
import StackDougnNutSpan1 from "@/app/components/Chart/StackDougnNutSpan1";
import CampaignGrid from "@/app/components/Dashboard/CampaignGrid";
// user context imports
// import { useStore as useStoreOwner } from "@/lib/context/user_context/store";

const Page = () => {
  // const { restaurantOwnerId, restaurantId, setRestaurantId } = useStoreOwner();
  const theme = useTheme();
  // useEffect(() => {
  //   const getRestaurantId = async () => {
  //     const data = await fetchRestaurantId(restaurantOwnerId);
  //     setRestaurantId(data.restaurantId);
  //   };

  //   if (restaurantOwnerId) {
  //     getRestaurantId();
  //   }
  // }, [restaurantOwnerId]);

  // console.log("restaurantOwnerId", restaurantOwnerId);
  // console.log("restaurantId", restaurantId);

  return (
    <>
      <Box
        sx={{
          // display: "flex",
          justifyContent: "space-between",
        }}
      >
        <HeaderGrid>
          <Header props={"Campaigns"} />
          <CreateNewCampaign />
        </HeaderGrid>

        <SubHeader props={"Ongoing campaigns"} />
        <MainGrid>
          {/* <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gridColumn: "1/-1",
              gap: "1.5rem",
              width: "100%",
              [theme.breakpoints.down('lg')]: {
                gridTemplateColumns: "repeat(2, 1fr)"},
              [theme.breakpoints.down('md')]: {
                gridTemplateColumns: "repeat(1, 1fr)",
              }
            }}
          > */}
            <ChartCard gridColumn={"span 1"}>
              <ChartCardTitle text={"Overview"} pinStatus={""}></ChartCardTitle>
              <StackDougnNutSpan1></StackDougnNutSpan1>
            </ChartCard>

            <ChartCard gridColumn={"2/-1"}>
              <ChartCardTitle
                text={"Hilighted Campaigns"}
                pinStatus={"active"}
              ></ChartCardTitle>
            </ChartCard>
          {/* </Box> */}

          {/* // CAMPAIGN GRID */}
          <CampaignGrid></CampaignGrid>
        </MainGrid>
      </Box>
    </>
  );
};

export default Page;
