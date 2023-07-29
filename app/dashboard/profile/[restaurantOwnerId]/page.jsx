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

// loader
import Loader from "@/app/components/Loader";

const Page = () => {
  const router = useRouter();
  const { restaurantOwnerId } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setIsLoading(true);
    };
    fetchData();
  }, []);

  const editClick = () => {
    router.push(`/dashboard/profile/edit/${restaurantOwnerId}`);
  };

  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Header props={"Profile"}></Header>
      {!isLoading ? (
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
              <NavbarMobile value={tab} setValue={setTab} />
              {tab === 0 && <BusinessInfo />}
              {tab === 1 && (
                <>
                  <BusinessHours />
                  <Box sx={{ marginTop: "17px" }}>
                    <Images />
                  </Box>
                </>
              )}
              {tab === 2 && <Referral />}
            </>
          )}

          {!isMobile && (
            <Box sx={{ margin: { md: "35px 70px" } }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <BusinessInfo restaurantOwnerId={restaurantOwnerId} />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <BusinessHours restaurantOwnerId={restaurantOwnerId} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Referral restaurantOwnerId={restaurantOwnerId} />
                    </Grid>
                    <Grid item xs={12}>
                      <Images restaurantOwnerId={restaurantOwnerId} />
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
              margin: "20px",
            }}
          >
            <SingleButtonNoIcon
              text="Edit"
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
