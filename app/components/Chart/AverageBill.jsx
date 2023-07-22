import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { fetchAverageBill } from "../../../lib/fetching/insights/data";
import { useStore } from "@/lib/context/user_context/store";
import Loader from "../Loader";

const AverageBill = () => {
    const { restaurantOwnerId } = useStore();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await fetchAverageBill(restaurantOwnerId);
          setData(res);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, [restaurantOwnerId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
        <Typography variant="h2" align="center">$ {Math.round(data.avgBillAmount)}</Typography>
        <Typography variant="h6">Range</Typography>
        <Typography variant="body1">
            Your bills usually go from $ {Math.round(data.minBillAmount)} to $ {Math.round(data.maxBillAmount)}.
            Monitoring the average bill size reveals popular menu items and guides strategies to maximize profitability and customer satisfaction.
        </Typography>
        </Box>
      )}
      </>
    );
  }

export default AverageBill;
