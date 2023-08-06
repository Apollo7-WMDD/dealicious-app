import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import {
  fetchAverageBill,
  fetchAverageBillSingle,
} from "../../../lib/fetching/insights/data";
import { useStore } from "@/lib/context/user_context/store";
import Loader from "../Loader";

const AverageBill = ({ campaignId }) => {
  const { restaurantOwnerId } = useStore();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let res;
        if (campaignId) {
          res = await fetchAverageBillSingle(campaignId);
        } else {
          res = await fetchAverageBill(restaurantOwnerId);
        }
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [restaurantOwnerId, campaignId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          style={{
            display: "grid",
            alignContent: "space-between",
            gap: "1rem",
            gridTemplateColumns: "repeat(1,1fr)",
            gridTemplateRows: "repeat(2,auto)",
            alignItems: "end",
            justifyItems: "center",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <Typography lineHeight="77px" variant="h2" align="center">
            $ {Math.round(data.avgBillAmount)}
          </Typography>
          <Box>
            <Typography marginBottom="10px" variant="h6">
              Range
            </Typography>
            <Typography variant="body1">
              Your bills usually go from $ {Math.round(data.minBillAmount)} to ${" "}
              {Math.round(data.maxBillAmount)}. Monitoring the average bill size
              reveals popular menu items and guides strategies to maximize
              profitability and customer satisfaction.
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AverageBill;
