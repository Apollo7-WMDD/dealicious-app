import { useEffect, useState } from "react";
import { Typography, Box, useTheme } from "@mui/material";
import {
  fetchAverageBill,
  fetchAverageBillSingle,
} from "../../../lib/fetching/insights/data";
import { useStore } from "@/lib/context/user_context/store";
import Loader from "../Loader";

const AverageBill = ({ campaignId }) => {
  const theme = useTheme();
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
        setData({
          avgBillAmount: res.avgBillAmount || 0,
          minBillAmount: res.minBillAmount || 0,
          maxBillAmount: res.maxBillAmount || 0,
        });
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
        //     ********************** MARIO'S CHANGE - TODO: CHECK WITH TONY
        //         <Box>
        //           <Typography
        //             lineHeight="77px"
        //             variant="h2"
        //             align="center"
        //             sx={{ marginBottom: "2rem" }}
        //           >
        //             $ {Math.round(data.avgBillAmount)}
        //           </Typography>
        //           <Typography marginBottom="10px" variant="h6">
        //             Range
        //           </Typography>
        //           <Typography variant="body1">
        //             Your bills usually go from $ {Math.round(data.minBillAmount)} to ${" "}
        //             {Math.round(data.maxBillAmount)}. Monitoring the average bill size
        //             reveals popular menu items and guides strategies to maximize
        //             profitability and customer satisfaction.
        //           </Typography>
        //     *****
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
          <Typography
            lineHeight="77px"
            variant="h2"
            align="center"
            sx={{ fontSize: "48px" }}
          >
            $ {Math.round(data.avgBillAmount)}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              width: "100%",

              // alignItems: "center",
              height: "200px",
              [theme.breakpoints.down("md")]: {
                minHeight: "0",
              },

            }}
          >
            {" "}
            <Typography
              marginBottom="10px"
              variant="h6"
              sx={{ gridColumn: "span 2", justifySelf: "center" }}
            >
              Range
            </Typography>
            <Box
              sx={{
                textAlign: "center",

                // minHeight: "100px",
                // [theme.breakpoints.down("md")]: {
                //   minHeight: "0",
                // },

              }}
            >
              <Typography variant="h5">Min</Typography>
              <Typography
                variant="h2"
                sx={{color:theme.palette.primary[100]}}
              >
                ${Math.round(data.minBillAmount)}
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: "center",

                // minHeight: "200px",

                [theme.breakpoints.down("md")]: {
                  minHeight: "0",
                },
              }}
            >
              <Typography variant="h5">Max</Typography>{" "}
              <Typography
                variant="h2"
                sx={{ color: theme.palette.primary[80] }}
              >
                ${Math.round(data.maxBillAmount)}
              </Typography>
            </Box>
            {/* OLD VERSION */}
            {/* <Typography marginBottom="10px" variant="h6">
              Range
            </Typography>
            <Typography variant="body1">
              Your bills usually go from $ {Math.round(data.minBillAmount)} to ${" "}
              {Math.round(data.maxBillAmount)}. Monitoring the average bill size
              reveals popular menu items and guides strategies to maximize
              profitability and customer satisfaction.
            </Typography> */}
          </Box>
        </Box>
      )}
    </>
  );
};

export default AverageBill;
