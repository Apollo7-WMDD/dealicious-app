"use client";
import Header from "@/app/components/Header/Header";
import { usePathname } from "next/navigation";
// user context
import { useStore } from "@/lib/context/user_context/store";
import { useState, useEffect } from "react";
import SingleButtonNoIcon from "@/app/components/Button/SingleButtonNoIcon";
import BusinessInfo from "@/app/components/OwnerProfile/BusinessInfo";
import BusinessHours from "@/app/components/OwnerProfile/BusinessHours";
import Images from "@/app/components/OwnerProfile/Images";
import Referral from "@/app/components/OwnerProfile/Referral";
import NavbarMobile from "@/app/components/Profile/NavbarMobile";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/navigation";
import {
  fetchBusinessHours,
  fetchBusinessInfo,
  fetchReferralSystem,
  fetchImagesMenus,
} from "@/lib/fetching/profile/data";

// loader
import Loader from "@/app/components/Loader";
import SingleButtonNoShadow from "@/app/components/Button/SingleButtonNoShadow";

const Page = () => {
  const router = useRouter();
  const { restaurantOwnerId } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [allData, setAllData] = useState({});

  const fetchAllDataForRestaurant = async (restaurantOwnerId) => {
    try {
      const [businessInfo, businessHours, referralSystem, imagesMenus] =
        await Promise.all([
          fetchBusinessInfo(restaurantOwnerId),
          fetchBusinessHours(restaurantOwnerId),
          fetchReferralSystem(restaurantOwnerId),
          fetchImagesMenus(restaurantOwnerId),
        ]);
      return {
        businessInfo,
        businessHours,
        referralSystem,
        imagesMenus,
      };
    } catch (error) {
      console.error("An error occurred while fetching all data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllDataForRestaurant(restaurantOwnerId);
        setAllData(data);
        console.log("restaurant data", data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [restaurantOwnerId]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 5000));
  //     setIsLoading(true);
  //   };
  //   fetchData();
  // }, []);

  const editClick = () => {
    router.push(`/dashboard/profile/edit/${restaurantOwnerId}`);
  };

  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box sx={{ marginLeft: { xs: "16px", md: "auto" } }}>
        <Header props={"Profile"}></Header>
      </Box>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gridColumn: "span 3",
            minHeight: "90vh",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          {isMobile && (
            <>
              <NavbarMobile
                value={tab}
                setValue={setTab}
                // style={{ overflow: "auto" }}
              />

              <Box sx={{ margin: "10px 16px 36px 16px" }}>
                {tab === 0 && (
                  <BusinessInfo
                    restaurantOwnerId={restaurantOwnerId}
                    data={allData.businessInfo}
                  />
                )}
                {tab === 1 && (

                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <BusinessHours
                      restaurantOwnerId={restaurantOwnerId}
                      data={allData.businessHours}
                    />

                    <Box sx={{ marginTop: "17px" }}>
                      <Images
                        restaurantOwnerId={restaurantOwnerId}
                        data={allData.imagesMenus}
                      />
                    </Box>
                  </Box>

                )}
                {tab === 2 && (
                  <Referral
                    restaurantOwnerId={restaurantOwnerId}
                    data={allData.referralSystem}
                  />

                )}
              </Box>
            </>
          )}

          {!isMobile && (
            <Box sx={{ margin: { md: "35px auto 24px auto" } }}>
              <Grid container spacing={"24px"}>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    width: "380px",
                    // height: "788px"
                    height: "auto",
                  }}
                >
                  <BusinessInfo
                    restaurantOwnerId={restaurantOwnerId}
                    data={allData.businessInfo}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={"24px"}>
                    <Grid
                      item
                      xs={12}
                      container
                      spacing={"24px"}
                      sx={{
                        [theme.breakpoints.down("lg")]: {
                          flexDirection: "column",
                          flexWrap: "nowrap",
                        },
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                          width: "100%",
                          // width: "380px",
                          // height: "433px"
                          height: "auto",
                          // height: "100%",
                          // maxWidth: "100%",
                          flexGrow: 1,
                          [theme.breakpoints.down("lg")]: {
                            maxWidth: "100%",
                          },
                          
                        }}
                      >
                        <BusinessHours
                          restaurantOwnerId={restaurantOwnerId}
                          data={allData.businessHours}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                          width: "100%",
                          // width: "380px",
                          //  height: "433px"
                          height: "auto",
                          flexGrow: 1,
                          [theme.breakpoints.down("lg")]: {
                            maxWidth: "100%",
                          },
                        }}
                      >
                        <Referral
                          restaurantOwnerId={restaurantOwnerId}
                          data={allData.referralSystem}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        width: "100%",
                        // width: "734px",
                        // height: "353px"
                        height: "auto",
                      }}
                    >
                      <Images
                        restaurantOwnerId={restaurantOwnerId}
                        data={allData.imagesMenus}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: { xs: "center", md: "flex-end" },
              marginTop: "50px",
              marginBottom: "50px",
              marginLeft: { xs: "16px", md: "auto" },
              marginRight: { xs: "16px", md: "auto" },
            }}
          >
            <SingleButtonNoShadow
              text="Edit Profile"
              onClick={editClick}
              width={{ xs: "100%", md: "174px" }}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default Page;
