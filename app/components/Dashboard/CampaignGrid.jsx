import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import { useStore } from "@/lib/context/user_context/store";
import ChartCard from "@/app/components/Card/ChartCard";
import ChartCardTitle from "@/app/components/Chart/ChartCardTitle";
import CampaignCardBody from "../Chart/CampaignCardBody";

// fetch imports
import { fetchAllCampaigns } from "@/lib/fetching/campaigns/data";

function CampaignGrid({ onPinClickB, children }) {
  const { restaurantOwnerId } = useStore();
  const [data, setData] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [hilighted, setHilighted] = useState({});

  // console.log(restaurantOwnerId);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAllCampaigns(restaurantOwnerId);
      const filteredResult =
      result.campaigns.filter((e) => Date.parse(e.startDate)  < Date.now() && Date.parse(e.endDate) > Date.now());
      // filteredResult.filter((e)=> Date.parse(e.endDate) > Date.now())
      setData(filteredResult);
      setDataArray(filteredResult || []);
      // setDataArray(result.campaigns);
    };
    fetchData();
  }, [restaurantOwnerId, hilighted]);

  // console.log(data);
  // console.log(dataArray);
  const theme = useTheme();
  const getPinIdSelected = (id) => {
    console.log("id is"+id);
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
      {dataArray.map((e) => (
        <ChartCard key={e._id}>
          <ChartCardTitle
            data={e}
            text={e.name}
            
            pinStatus={hilighted == e._id ? 
              // (console.log("hilighted TRUE")) : (console.log("hilighted FASLE"))
              true : false
            }
            pinIdSelected={getPinIdSelected}
            showPin={true}
            onPinClick={onPinClickB}
          ></ChartCardTitle>

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
      ))}
    </Box>
  );
}

export default CampaignGrid;
