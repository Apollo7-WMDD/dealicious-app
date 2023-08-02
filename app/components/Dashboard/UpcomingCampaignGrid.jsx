import { Box, useTheme, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useStore } from "@/lib/context/user_context/store";
import ChartCard from "@/app/components/Card/ChartCard";
import ChartCardTitle from "@/app/components/Chart/ChartCardTitle";
import CampaignCardBody from "../Chart/CampaignCardBody";

// fetch imports
import { fetchAllCampaigns } from "@/lib/fetching/campaigns/data";
import Loader from "../Loader";

// Card for each campaign in a different sub-component
function CampaignCard({ campaign }) {
  const {
    _id,
    name,
    offer,
    startDate,
    endDate,
    allowNewCustomer,
    allowSuperCustomer,
    description,
  } = campaign;
  return (
    <ChartCard key={_id}>
      <ChartCardTitle data={campaign} text={name}></ChartCardTitle>
      <CampaignCardBody>
        <p style={{ margin: "0", fontWeight: "lighter" }}>Item: {offer}</p>
        {startDate && endDate && (
          <p style={{ margin: "0", fontWeight: "lighter" }}>
            Duration: {new Date(startDate).toISOString().substring(0, 10)} to{" "}
            {new Date(endDate).toISOString().substring(0, 10)}
          </p>
        )}
        <p style={{ margin: "0", fontWeight: "lighter" }}>
          Users: {allowNewCustomer ? "New Customers" : ""}
          {allowNewCustomer && allowSuperCustomer ? " & " : ""}
          {allowSuperCustomer ? "Super Customers" : ""}
        </p>
        <p style={{ margin: "0", fontWeight: "lighter" }}>
          Condition: {description}
        </p>
      </CampaignCardBody>
    </ChartCard>
  );
}

function CampaignGrid() {
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
        if (result?.campaigns && result.campaigns.length > 0) {
          const filteredResult = result.campaigns.filter(
            (e) => Date.parse(e.startDate) > Date.now()
          );
          filteredResult.sort(
            (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate)
          );
          setDataArray(filteredResult);
        } else {
          setDataArray([]);
        }
      } catch (error) {
        console.error("fetching data:", error);
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
      ) : dataArray.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gridColumn: "span 3",
          }}
        >
          <Typography variant="h4" sx={{textAlign:"left"}}>No Upcoming campaigns...</Typography>
        </div>
      ) : (
        dataArray.map((campaign) => (
          <CampaignCard key={campaign._id} campaign={campaign} />
        ))
      )}
    </Box>
  );
}

export default CampaignGrid;
