import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import { useStore } from "@/lib/context/user_context/store";
import ChartCard from "@/app/components/ChartCard";
import ChartCardTitle from "@/app/components/Chart/ChartCardTitle";

// fetch imports
import { fetchAllCampaigns } from "@/lib/fetching/campaigns/data";

function CampaignGrid({ children }) {
  const { restaurantOwnerId } = useStore();
  const [data, setData] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  console.log(restaurantOwnerId);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAllCampaigns(restaurantOwnerId);
      setData(result);
      setDataArray(result.campaigns);
    };
    fetchData();
  }, [restaurantOwnerId]);

  console.log(data);
  console.log(dataArray);
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
      {dataArray.map((e) => (
        <ChartCard key={e._id}>
          <ChartCardTitle
            text={e.name}
            pinStatus={"none"}
          ></ChartCardTitle>
        </ChartCard>
      ))}
    </Box>
  );
}

export default CampaignGrid;
