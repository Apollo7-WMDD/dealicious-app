import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
import { fetchCustomerCampaignUsageByTime } from "../../../lib/fetching/insights/data";
import { useStore } from "@/lib/context/user_context/store";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useTheme, Button } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
  // ChartDataLabels
);

function LineChart() {
  const { restaurantOwnerId } = useStore();
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("Daily");
  console.log(restaurantOwnerId);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCustomerCampaignUsageByTime(restaurantOwnerId);
      setData(result);
    };
    fetchData();
  }, [restaurantOwnerId]);

  console.log(data);

  const theme = useTheme();

  const config = {
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // pointStyle: true,
    pointStyle: true,
    elements: {
      line: {
        tension: 0.5,
      },
      point: {
        hitRadius: 20,
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },

    plugins: {
      // datalabels: {
      //   display: false,

      // },
    //  !EXPERIMENT WITH GENERATING LEGEND AS SEPARATE HTML COMPONENT
      // htmlLegend: {
      //   // ID of the container to put the legend in
      //   containerID: 'legend-container',
      // },
      legend: {
        display: true,
        position: "bottom",
        align: "start",

        labels: {
          color: theme.palette.background.alt,
          usePointStyle: true,
          pointStyle: "rectRounded",
        },
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];


  const dailyData = [
    {x: Date.parse('2023-01-02 00:00:00 '), y: 52},
    {x: Date.parse('2023-01-08 00:00:00 '), y: 63},
    {x: Date.parse('2023-01-16 00:00:00 '), y: 85},
    {x: Date.parse('2023-01-23 00:00:00 '), y: 36},
    {x: Date.parse('2023-01-30 00:00:00 '), y: 90},
    {x: Date.parse('2023-02-02 00:00:00 '), y: 63},
    {x: Date.parse('2023-02-08 00:00:00 '), y: 88},
    {x: Date.parse('2023-02-16 00:00:00 '), y: 25},
    {x: Date.parse('2023-02-23 00:00:00 '), y: 77},
    {x: Date.parse('2023-02-30 00:00:00 '), y: 52},
    {x: Date.parse('2023-03-02 00:00:00 '), y: 95},
    {x: Date.parse('2023-03-08 00:00:00 '), y: 62},
    {x: Date.parse('2023-03-16 00:00:00 '), y: 82},
    {x: Date.parse('2023-03-23 00:00:00 '), y: 48},
    {x: Date.parse('2023-03-30 00:00:00 '), y: 15},
  ];
  const lineChartData = {
    // labels,
    datasets: [
      {
        label: "Campaign 1",
        data: dailyData,
        borderColor: theme.palette.primary[80],
        backgroundColor: theme.palette.primary[80],
      },
      // {
      //   label: "Campaign 2",
      //   data: [54, 77, 31, 89, 45, 67, 23],
      //   borderColor: theme.palette.primary[100],
      //   backgroundColor: theme.palette.primary[100],
      //   yAsis: "y",
      //   xAsis: "x",
      // },
    ],
  };
  return (
    <div
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
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          gridColumn: "1/-1",
          // gridRow: "1/-1",
        }}
      >
        <Line
          options={options}
          config={config}
          data={lineChartData}
          style={{
            width: "100%",

            
          }}
        />
      </div>
      <div
        style={{
          // gridColumn: "1/-1",
          // position: "absolute",
          // bottom: "-.25rem",
          display: "inline-block",
          textAlign: "right",
          // width: "60%",
        }}
      >
        <Button
          onClick={() => setPeriod("Daily")}
          variant="text"
          sx={{
            color: period == "Daily" ? theme.palette.background.alt : theme.palette.neutral[60],
            typography: "body1",
          }}
        >
          Daily
        </Button>
        <Button
          onClick={() => setPeriod("Weekly")}
          variant="text"
          sx={{
            color: period == "Weekly" ? theme.palette.background.alt : theme.palette.neutral[60],
            typography: "body1",
          }}
        >
          Weekly
        </Button>
        <Button
          
          onClick={() => setPeriod("Monthly")}
          variant="text"
          sx={{
            color: period == "Monthly" ? theme.palette.background.alt : theme.palette.neutral[60],
            typography: "body1",
          }}
        >
          Monthly
        </Button>
        <Button
          onClick={() => setPeriod("Yearly")}
          variant="text"
          sx={{
            color: period == "Yearly" ? theme.palette.background.alt : theme.palette.neutral[60],
            typography: "body1",
          }}
        >
          Yearly
        </Button>
      </div>
      <div id="legend-container"></div>
    </div>
  );
}

export default LineChart;
