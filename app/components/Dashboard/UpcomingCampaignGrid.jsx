import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import { useStore } from "@/lib/context/user_context/store";
import ChartCard from "@/app/components/Card/ChartCard";
import ChartCardTitle from "@/app/components/Chart/ChartCardTitle";
import CampaignCardBody from "../Chart/CampaignCardBody";

// fetch imports
import { fetchAllCampaigns } from "@/lib/fetching/campaigns/data";
import Loader from "../Loader";

function CampaignGrid({ onPinClickB, children }) {
  const theme = useTheme();
  const { restaurantOwnerId } = useStore();
  const [data, setData] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchAllCampaigns(restaurantOwnerId);
        const filteredResult = result.campaigns.filter(
          (e) => Date.parse(e.startDate) > Date.now()
        );
        filteredResult.sort(
          (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate)
        );
        setData(filteredResult);
        setDataArray(filteredResult || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [restaurantOwnerId]);

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
          }}
        >
          <Loader />
        </div>
      ) : (
        dataArray.map((e) => (
          <ChartCard key={e._id}>
            <ChartCardTitle data={e} text={e.name}></ChartCardTitle>

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
                Duration: {new Date(e.startDate).toISOString().substring(0, 10)}{" "}
                to {new Date(e.endDate).toISOString().substring(0, 10)}
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
          </ChartCard>
        ))
      )}
    </Box>
  );
}

export default CampaignGrid;
