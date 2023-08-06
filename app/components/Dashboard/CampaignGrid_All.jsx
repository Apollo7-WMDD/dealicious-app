"use client";
import { Box, Link, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useStore } from "@/lib/context/user_context/store";

import ChartCard_Insight from "@/app/components/Card/ChartCard_Insight";
import ChartCardTitle from "@/app/components/Chart/ChartCardTitle";
import ChartCardTitleInsights from "../Chart/ChartCardTitleInsights";
import CampaignCardBody from "../Chart/CampaignCardBody";

// fetch imports
import {
  fetchAllCampaigns,
  fetchTotalRevenueSingle,
  // fetchCampaignsPreview
} from "@/lib/fetching/campaigns/data";
import { fetchCampaignsPreview } from "@/lib/fetching/insights/data";

// loader
import Loader from "../Loader";

import { useMediaQuery } from "@mui/material";

function CampaignGrid({ children }) {
  const isOneColumn = useMediaQuery("(min-width:900px)");
  const router = useRouter();
  const { restaurantOwnerId, restaurantId } = useStore();
  const [dataArray, setDataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortByPin, setSortByPin] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchAllCampaigns(restaurantOwnerId);
        const filteredResult = result.campaigns.sort(
          (b, a) => Date.parse(a.endDate) - Date.parse(b.endDate)
        );
        filteredResult.sort((a, b) => (b.favorite ? 1 : -1));

        const dataArrayWithPinnedStatus = filteredResult.map((item) => ({
          ...item,
          pinned: item.favorite,
        }));

        setDataArray(dataArrayWithPinnedStatus || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [restaurantOwnerId]);

  console.log(dataArray);
  const theme = useTheme();
  useEffect(() => {
    setDataArray([...dataArray].sort((a, b) => (b.pinned ? 1 : -1)));
  }, [sortByPin]);

  return (
    <Box
      sx={{
        gridColumn: "span 3",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        width: "100%",
        gap: "1.5rem",
        gridAutoFlow: "row dense",

        // margin: "1.5rem 0",
        [theme.breakpoints.down("lg")]: {
          gridColumn: "span 2",
          gridTemplateColumns: "repeat(2, 1fr)",
        },
        [theme.breakpoints.down("md")]: {
          gridColumn: "span 1",
          gridTemplateColumns: "repeat(1, 1fr)",
        },
      }}
    >
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
        dataArray.map((e) => (
          <Link
            key={e._id}
            sx={{
              textDecoration: "none",
              textAlign: "left",
              cursor: "pointer",
            }}
            onClick={() => {
              router.push(
                `/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId}/${e._id}`
              );
            }}
          >
            <ChartCard_Insight
              key={e._id}
              style={
                {
                  // height: "100%",
                  // ":hover": {
                  //   color: "hotpink",
                  // },
                }
              }
            >
              <ChartCardTitleInsights
                data={e}
                text={e.name}
                pinStatus={e.favorite}
                showPin={true}
                setClickPin={setSortByPin}
                // style={{
                //   ":hover": {
                //     color: "hotpink",
                //   },
                // }}
              ></ChartCardTitleInsights>

              <CampaignCardBody>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".5rem",
                    alignContent: "space-between",
                    [theme.breakpoints.down("md")]: {
                      marginRight: "1rem",
                    },
                  }}
                >
                
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: "24px",
                        color: theme.palette.primary[80],
                        textAlign: "center",
                        [theme.breakpoints.down("md")]: {
                          textAlign: "left",
                        },
                      }}
                    >
                      Revenue:
                    </Typography>
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: "64px",
                        textAlign: "center",
                        [theme.breakpoints.down("md")]: {
                          textAlign: "left",
                        },
                      }}
                    >
                      {e.spending}
                    </Typography>
                                  </Box>
              </CampaignCardBody>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: ".2rem",
                  width: "100%",

                  [theme.breakpoints.down("md")]: {
                    flexDirection: "column",
                    flexShrink: 0,
                    flexBasis: "45%",
                    flexGrow: 1,
                  },
                  // , gridTemplateColumns: "repeat(2,1fr)"
                }}
              >
                <p
                  style={{
                    margin: "0",
                    fontWeight: "lighter",
                    flexBasis: "55%",
                  }}
                >
                  Start date:{" "}
                  {new Date(e.startDate).toISOString().substring(0, 10)}
                  {/* {new Date(e.endDate).toISOString().substring(0, 10)} */}
                </p>
                <Typography
                  variant="p"
                  sx={{
                    textAlign: "right",
                    margin: "0",
                    fontWeight: "lighter",
                    flexBasis: "55%",
                    [theme.breakpoints.down("md")]: {
                      textAlign: "left",
                    },
                  }}
                >
                  End date:{" "}
                  {/* {new Date(e.startDate).toISOString().substring(0, 10)} to{" "} */}
                  {new Date(e.endDate).toISOString().substring(0, 10)}
                </Typography>
              </Box>
            </ChartCard_Insight>
          </Link>
        ))
      )}
    </Box>
  );
}

export default CampaignGrid;
