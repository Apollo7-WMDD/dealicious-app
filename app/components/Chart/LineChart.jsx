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

import { Line } from "react-chartjs-2";
import { useTheme } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  // ChartDataLabels
);

function LineChart() {
  const theme = useTheme();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // pointStyle: true,
    pointStyle: false,
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
      legend: {
         
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

  const data = {
    labels,
    datasets: [
      {
        label: "Campaign 1",
        data: [52, 67, 71, 69, 55, 27, 13],
        borderColor: theme.palette.primary[80],
        backgroundColor: theme.palette.primary[80],
      },
      {
        label: "Campaign 2",
        data: [54, 77, 31, 89, 45, 67, 23],
        borderColor: theme.palette.primary[100],
        backgroundColor: theme.palette.primary[100],
        yAsis: "y",
        xAsis: "x",
      },
    ],
  };
  return (
    <div>
      <Line
        options={options}
        data={data}
        style={{ width: "100%", height: "300px" }}
      />
    </div>
  );
}

export default LineChart;
