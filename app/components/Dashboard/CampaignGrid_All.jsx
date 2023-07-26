"use client";
import { Box, Link, useTheme } from "@mui/material";
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
} from "@/lib/fetching/campaigns/data";

// loader
import Loader from "../Loader";

function CampaignGrid({ children }) {
  const router = useRouter();
  const { restaurantOwnerId, restaurantId } = useStore();
  const [data, setData] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [hilighted, setHilighted] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchAllCampaigns(restaurantOwnerId);
        const filteredResult = result.campaigns.sort(
          (b, a) => Date.parse(a.endDate) - Date.parse(b.endDate)
        );
        setData(filteredResult);

        filteredResult.sort((a, b) => (b.favorite ? 1 : -1));

        setDataArray(filteredResult || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [restaurantOwnerId]);

  const theme = useTheme();

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
              style={{
                ":hover": {
                  color: "hotpink",
                },
              }}
            >
              <ChartCardTitleInsights
                data={e}
                text={e.name}
                pinStatus={e.favorite}
                showPin={true}
                style={{
                  ":hover": {
                    color: "hotpink",
                  },
                }}
              ></ChartCardTitleInsights>

              <CampaignCardBody>
                <p
                  style={{
                    margin: "0",
                    fontWeight: "lighter",
                  }}
                >
                  Item: {e.offer}
                </p>
                <p
                  style={{
                    margin: "0",
                    fontWeight: "lighter",
                  }}
                >
                  Duration:{" "}
                  {new Date(e.startDate).toISOString().substring(0, 10)} to{" "}
                  {new Date(e.endDate).toISOString().substring(0, 10)}
                </p>
                <p
                  style={{
                    margin: "0",
                    fontWeight: "lighter",
                  }}
                >
                  Users: {e.allowNewCustomer ? "New Customers" : ""}
                  {e.allowNewCustomer && e.allowSuperCustomer ? " & " : ""}
                  {e.allowSuperCustomer ? "Super Customers" : ""}
                </p>
                <p
                  style={{
                    margin: "0",
                    fontWeight: "lighter",
                  }}
                >
                  Condition: {e.description}
                </p>
              </CampaignCardBody>
            </ChartCard_Insight>
          </Link>
        ))
      )}
    </Box>
  );
}

export default CampaignGrid;
