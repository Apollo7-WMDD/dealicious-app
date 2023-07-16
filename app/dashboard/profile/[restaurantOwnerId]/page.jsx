"use client";
import Header from "@/app/components/Header/Header";
import { usePathname } from "next/navigation";
// user context
import { useStore } from "@/lib/context/user_context/store";
import { useEffect, useState } from "react";
import SingleButtonNoIcon from "@/app/components/Button/SingleButtonNoIcon";
import BusinessInfo from "@/app/components/OwnerProfile/BusinessInfo";
import BusinessHours from "@/app/components/OwnerProfile/BusinessHours";
import Images from "@/app/components/OwnerProfile/Images";
import Referral from "@/app/components/OwnerProfile/Referral";
import NavbarMobile from "@/app/components/Profile/NavbarMobile";
import {Box, Grid} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from "next/navigation";
// const fetchOwnerInfo = async (restaurantOwnerId) => {
//   const isProduction = process.env.NODE_ENV === "production";
//   const serverUrl = isProduction
//     ? process.env.NEXT_PUBLIC_SERVER_URL
//     : "http://localhost:3000";

//   const res = await fetch(
//     `${serverUrl}/api/dashboard/profile/${restaurantOwnerId}`
//     // {
//     //   cache: "no-store",
//     // }
//   );

//   if (!res.ok) throw new Error("Something went wrong...");

//   const data = await res.json();
//   return data;
// };

const Page = async () => {
  const router = useRouter();
  // const { restaurantOwnerId } = params;
  // const ownerData = await fetchOwnerInfo(restaurantOwnerId);
  // console.log("owner data: ", ownerData);
  
  // const { restaurantOwnerId,setRestaurantOwner} = useStore();
  // const pathname = usePathname();
  // const URLrestaurantOwnerId = pathname.split("/")[3];
  // useEffect(() => {
  //   const setRestaurantOwnerFromParam =  () => {
  //     setRestaurantOwner(URLrestaurantOwnerId);
  //   };
  //   setRestaurantOwnerFromParam();
  // }, [URLrestaurantOwnerId]);
  // console.log("restaurantOwnerId: ", restaurantOwnerId);
  
  
  const editClick = () => {
    router.push(`/dashboard/profile/edit/${restaurantOwnerId}`);
  };

  const [tab, setTab] = useState(0);

  // useEffect(() => {
  //   setRestaurantOwner(URLrestaurantOwnerId);
  //   (async () => {
  //     const ownerData = await fetchOwnerInfo(restaurantOwnerId);
  //     console.log("owner data: ", ownerData);
  //   })();
  // }, [URLrestaurantOwnerId, restaurantOwnerId]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Header props={"Profile"}></Header>
      {isMobile && (
        <>
        <NavbarMobile value={tab} setValue={setTab} />
        {tab === 0 && <BusinessInfo />}
        {tab === 1 && (
          <>
            <BusinessHours />
            <Box sx={{marginTop:'17px'}}>
              <Images />
            </Box>
          </>
        )}
        {tab === 2 && <Referral />}
        </>
      )}

      {!isMobile && (
        <Box sx={{ margin:{ md: '35px 70px' }}}>
          <Grid container spacing={2} >
            <Grid item xs={12} md={4}>
              <BusinessInfo />
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <BusinessHours />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Referral />
                </Grid>
                <Grid item xs={12}>
                  <Images />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
      <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: { xs:'center', md: 'flex-end'},
          margin: '20px',
        }}>
        <SingleButtonNoIcon
          text="Edit" 
          onClick={editClick} 
          width={{ xs: '100%', md: '174px' }}
        />
      </Box>
    </>
  );
};

export default Page;