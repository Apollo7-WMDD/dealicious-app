import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTheme } from "@mui/material";
import {fetchNumberOf } from '../../../lib/fetching/insights/data';
import { useEffect, useState } from "react";
import { useStore } from "@/lib/context/user_context/store";

ChartJS.register(ArcElement, Tooltip, Legend);


function DoughnutChart() {
  const { restaurantOwnerId  } = useStore();
  const [data, setData] = useState([]);
  console.log(restaurantOwnerId);

useEffect(() => {
    const fetchData = async () => {
      const result = await fetchNumberOf(restaurantOwnerId);
      setData(result);
    };
    fetchData();
  }, [restaurantOwnerId]);

  console.log(data)

  const theme = useTheme();
  defaults.font.family = theme.typography.fontFamily;
  defaults.font.size = theme.typography.fontSize;

  const doughnutFakeData = {
    // Chart.defaults.font.family = 'Helvetica Neue';
    labels: ["Super customers", "New customers"],
    datasets: [
      {
        data: [12, 19],
        backgroundColor: [
          theme.palette.primary[80],
          theme.palette.primary[100],
          // theme.palette.primary[60],
        ],
        // hoverBackgroundColor: [ theme.palette.primary[80],
        // theme.palette.primary[100],
        // theme.palette.primary[60],],
        borderColor: ["transparent", "transparent", "transparent"],
        color: [
          theme.palette.background.alt,
          // theme.palette.background.alt,
          theme.palette.background.alt,
        ],
      },
    ],
  };

  const option = {
    responsive: true,
    maintainAspectRatio: true,

    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        labels: {
          color: theme.palette.background.alt,
          boxWidth: 20,
          // fontSize: 25,
          usePointStyle: true,
          pointStyle: "rectRounded",
         
        },
        display: true,
        position: "right",
      },
    },
  };
  return (
    <div>
      <Doughnut
        data={doughnutFakeData}
        style={{
          width: "100%",
          height: "100%",
          // gridColumn: "span 1",
        }}
        options={option}
      />
     
    </div>
  );
}

export default DoughnutChart;
