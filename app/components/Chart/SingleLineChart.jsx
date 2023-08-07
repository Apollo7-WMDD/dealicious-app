import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useTheme, Button, Typography, Box } from "@mui/material";
import { useStore } from "@/lib/context/user_context/store";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  defaults,
} from "chart.js";
import "chartjs-adapter-date-fns";
import Loader from "../Loader";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const SingleLineChart = ({ fetchDataSource, showTextSource, campaignId }) => {
  console.log(
    "file: SingleLineChart.jsx:30 ~ SingleLineChart ~ campaignId:",
    campaignId
  );
  const getcampaignId = campaignId;
  console.log(
    "🚀 ~ file: SingleLineChart.jsx:32 ~ SingleLineChart ~ getcampaignId:",
    getcampaignId
  );
  const { restaurantOwnerId } = useStore();
  const [data, setData] = useState(null);
  const [period, setPeriod] = useState("daily");
  const [isLoading, setIsLoading] = useState(true);
  console.log("fetchDataSource.name");
  console.log(fetchDataSource.name);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (fetchDataSource.name == "fetchTotalRevenueSingle") {
          console.log("fetchTotalRevenueSingle");
          const res = await fetchDataSource(getcampaignId);
          setData(res);
        } else if (fetchDataSource.name == "fetchTotalRevenue") {
          console.log("fetchTotalRevenue");
          const res = await fetchDataSource(restaurantOwnerId);
          setData(res);
        } else if (fetchDataSource.name == "fetchNCbecameSC") {
          console.log("fetchNCbecameSC");
          const res = await fetchDataSource(getcampaignId);
          setData(res);
        } else if (fetchDataSource.name == "fetchCustomerCampaignTimeSingle") {
          console.log("fetchCustomerCampaignTimeSingle");
          const res = await fetchDataSource(restaurantOwnerId);
          setData(res);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [restaurantOwnerId, campaignId, fetchDataSource]);

  console.log("single line chart", data);

  const showText = data && showTextSource ? showTextSource( formatNumber(data) ) : "";

  const theme = useTheme();
  defaults.font.family = theme.typography.fontFamily;
  defaults.font.size = theme.typography.fontSize;

  const periodKey =
    period === "daily" ? "date" : period === "weekly" ? "week" : "month";
  const chartData = {
    labels: data?.[period]?.map((item) => item[periodKey]),
    datasets: [
      {
        data: data?.[period]?.map((item) => item.totalRevenue),
        fill: false,
        borderColor: theme.palette.primary[80],
        backgroundColor: theme.palette.primary[80],
      },
    ],
  };

  let delayed;
  const options = {
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;

        if (context.type == "data" && context.mode == "default" && !delayed) {
          delay = context.dataIndex * 50;
        }
        return delay;
      },
    },

    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.5,
      },
      point: {
        hitRadius: 20,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        display: true,
        title: {
          display: true,
        },
        ticks: {
          callback: function (val, index) {
            return index % 5 === 0
              ? this.getLabelForValue(val).split(",")[0]
              : "";
          },
          color: theme.palette.background.alt,
        },
        border: {
          color: theme.palette.background.alt,
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        beginAtZero: false,
        ticks: {
          min: 0,
          // stepSize: 2000,
          max:
            data && data[period]
              ? Math.max(...data[period].map((item) => item.totalRevenue)) * 1.1
              : 0,
          padding: 10,
          callback: function (val, index) {
            return index % 3 === 0 ? this.getLabelForValue(val) : "";
          },
          color: theme.palette.background.alt,
        },
        border: {
          color: theme.palette.background.alt,
        },
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        bottom: -30,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            var date = new Date(context[0].parsed.x);
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${year}-${month}-${day}`;
          },
        },
      },
    },
  };

  function formatNumber(num) {
    if(num >= 1000) {
      return (num/1000).toFixed(1) + 'k'; // 
    } else {
      return num;
    }
  }
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          style={{
            display: "grid",
            alignContent: "center",
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



              
          <Typography variant="h2" align="center" lineHeight="77px" sx={{ fontSize: "48px" }} >
            {showText}
          </Typography>
          <Box
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              gridColumn: "1/-1",
            }}
          >
            {/* line chart */}
            <Box sx={{ maxHeight: "250px", 
            height: "100%" 
            }}>
              <Line
                // plugins={plugins}
                data={chartData}
                options={options}
                style={{
                  maxHeight: "250px",
                  minHeight: "180px",
                  width: "100%",
                  maxWidth: "100%",
                }}
              />
            </Box>
            {/* daily,weekly button */}
            <Box sx={{ textAlign:"end"}}>
              <Button
                onClick={() => setPeriod("daily")}
                variant="text"
                sx={{
                  marginRight: "10px",
                  color:
                    period === "daily"
                      ? theme.palette.background.alt
                      : theme.palette.neutral[60],
                  typography: "body1",
                }}
              >
                Daily
              </Button>
              <Button
                onClick={() => setPeriod("weekly")}
                variant="text"
                sx={{
                  marginRight: "10px",
                  color:
                    period === "weekly"
                      ? theme.palette.background.alt
                      : theme.palette.neutral[60],
                  typography: "body1",
                }}
              >
                Weekly
              </Button>
              <Button
                onClick={() => setPeriod("monthly")}
                variant="text"
                sx={{
                  color:
                    period === "monthly"
                      ? theme.palette.background.alt
                      : theme.palette.neutral[60],
                  typography: "body1",
                }}
              >
                Monthly
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SingleLineChart;
