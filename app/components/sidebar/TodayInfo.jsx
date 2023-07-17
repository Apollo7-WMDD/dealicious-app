import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

// fetch current info
import { fetchCurrentInfo } from "@/lib/fetching/campaigns/data";

// react hooks
import { useState, useEffect } from "react";

// state
import { useStore } from "@/lib/context/user_context/store";

const TodayInfo = () => {
  const theme = useTheme();
  const [currentInfo, setCurrentInfo] = useState({ revenue: 0, customers: 0 });
  const { restaurantId } = useStore();

  console.log("This is the restaurantId in the green label: ", restaurantId);

  useEffect(() => {
    const getCurrentInfo = async () => {
      const currentInfo = await fetchCurrentInfo(restaurantId);
      setCurrentInfo({
        revenue: currentInfo?.sum,
        customers: currentInfo?.numCustomers,
      });
    };
    getCurrentInfo();
  }, [restaurantId]);

  console.log("This is the currentInfo: ", currentInfo);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary[100],
        borderRadius: "1rem 1rem 1rem 1rem",
        textAlign: "center",
        margin: "1rem 2rem",
        padding: "1rem 0",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: theme.palette.secondary[20],
        }}
      >
        Today
      </Typography>
      <br />
      <Typography
        variant="h5"
        sx={{ fontWeight: "300", color: theme.palette.secondary[20] }}
      >
        Revenue
      </Typography>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: theme.palette.secondary[20],
        }}
      >
        {currentInfo.revenue}
      </Typography>
      <br />
      <Typography
        variant="h5"
        sx={{ fontWeight: "300", color: theme.palette.secondary[20] }}
      >
        Customers
      </Typography>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: theme.palette.secondary[20],
        }}
      >
        {currentInfo.customers}
      </Typography>
    </Box>
  );
};

export default TodayInfo;
