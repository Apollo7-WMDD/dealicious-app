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
  defaults
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

const SingleLineChart = ({ fetchDataSource, showTextSource }) => {
    const { restaurantOwnerId } = useStore();
    const [data, setData] = useState(null);
    const [period, setPeriod] = useState("daily");
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await fetchDataSource(restaurantOwnerId);
          setData(res);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, [restaurantOwnerId, fetchDataSource]);

    const showText = data && showTextSource ? showTextSource(data) : '';

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const res = await fetchTotalRevenue(restaurantOwnerId);
//         setData(res);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [restaurantOwnerId]);
//   console.log(data);

    const theme = useTheme();
    defaults.font.family = theme.typography.fontFamily;
    defaults.font.size = theme.typography.fontSize;

    const periodKey = period === 'daily' ? 'daily' : period === 'weekly' ? 'week' : 'month';
    const chartData = {
        labels: data?.[period]?.map(item => item[periodKey]),
        datasets: [
        {
            data: data?.[period]?.map(item => item.totalRevenue),
            fill: false,
            borderColor: theme.palette.primary[80],
            backgroundColor: theme.palette.primary[80],
        },
        ],
    };
  

    const options = {
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
            display: false,
        },
        y: {
            display: false,
            beginAtZero: true,
            ticks: {
            min: 0,
            max: data && data[period]
                ? Math.max(...data[period].map(item => item.totalRevenue)) * 1.1
                : 0,
            padding: 10
            }
        },
        },
        plugins: {
        legend: {
            display: false,
        },
        },
    };
    

    return (
        <>
        {isLoading ? (
            <Loader />
        ) : (
            <Box
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(1,1fr)",
                gridTemplateRows: "repeat(2,auto)",
                alignItems: "end",
                justifyItems: "flex-end",
                width: "100%",
                height: "100%",
                position: "relative",
            }}
            >
            <Box
                style={{
                position: "relative",
                width: "100%",
                height: "100%",
                gridColumn: "1/-1",
                }}
            >
                <Typography variant="h2" align="center">{showText}</Typography>
                <Line data={chartData} options={options} style={{maxHeight: "250px"}}/>
            </Box>
            <Box>
                <Button
                onClick={() => setPeriod("daily")}
                variant="text"
                sx={{
                    marginRight: "10px",
                    color: period === "daily" ? theme.palette.background.alt : theme.palette.neutral[60],
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
                    color: period === "weekly" ? theme.palette.background.alt : theme.palette.neutral[60],
                    typography: "body1",
                }}
                >
                Weekly
                </Button>
                <Button
                onClick={() => setPeriod("monthly")}
                variant="text"
                sx={{
                    color: period === "monthly" ? theme.palette.background.alt : theme.palette.neutral[60],
                    typography: "body1",
                }}
                >
                Monthly
                </Button>
            </Box>
            </Box>
        )}
        </>
    );
  
};

export default SingleLineChart;
