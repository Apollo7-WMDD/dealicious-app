import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import { useStore } from "@/lib/context/user_context/store";
import ChartCardOngoingUpcoming from "@/app/components/Card/ChartCardOngoingUpcoming";
import ChartCardTitle from "@/app/components/Chart/ChartCardTitle";
import CampaignCardBody from "../Chart/CampaignCardBody";

// fetch imports
import { fetchAllCampaigns } from "@/lib/fetching/campaigns/data";

// loader
import Loader from "../Loader";

function CampaignGrid({ onPinClickB }) {
  const theme = useTheme();
  const { restaurantOwnerId } = useStore();
  const [dataArray, setDataArray] = useState([]);
  console.log(
    "🚀 ~ file: CampaignGrid.jsx:19 ~ CampaignGrid ~ dataArray:",
    dataArray
  );
  const [hilighted, setHilighted] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchAllCampaigns(restaurantOwnerId);
        const filteredResult = result.campaigns.filter(
          (e) =>
            Date.parse(e.startDate) < Date.now() &&
            Date.parse(e.endDate) > Date.now()
        );
        setDataArray(filteredResult || []);
      } catch (error) {
        console.error("fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [restaurantOwnerId, hilighted]);

  const getPinIdSelected = (id) => {
    setHilighted(id);
  };

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
      ) : dataArray.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gridColumn: "span 3",
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "left" }}>
            No Ongoing campaigns...
          </Typography>
        </div>
      ) : (
        dataArray.map((e) => (
          <ChartCardOngoingUpcoming key={e._id}>
            <div style={{ minHeight: "70px", minWidth: "100%" }}>
              <ChartCardTitle
                data={e}
                text={e.name}
                pinStatus={hilighted === e._id ? true : false}
                pinIdSelected={getPinIdSelected}
                showPin={true}
                onPinClick={onPinClickB}
              ></ChartCardTitle>
            </div>
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
          </ChartCardOngoingUpcoming>
        ))
      )}
    </Box>
  );
}

export default CampaignGrid;
