import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTheme, Typography } from "@mui/material";
import { fetchPointsSingle } from "../../../lib/fetching/insights/data";
import { useEffect, useState } from "react";

import Loader from "../Loader";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart_Single_Point({restaurantOwnerId}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchPointsSingle(restaurantOwnerId);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [restaurantOwnerId]);

  const formatData = Object.values(data).slice(1);
  console.log('Points Data', data);

  const theme = useTheme();
  defaults.font.family = theme.typography.fontFamily;
  defaults.font.size = theme.typography.fontSize;

  const doughnutFakeData = {
    labels: ["Total", "Redeemed"],
    datasets: [
      {
        data: [data.totalPoints, data.totalRedeemedPoints],
        backgroundColor: [
          theme.palette.primary[80],
          theme.palette.primary[100],
          // theme.palette.primary[60],
        ],
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
    maintainAspectRatio: false,

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

  function formatNumber(num) {
    if(num >= 1000) {
      return (num/1000).toFixed(1) + 'k'; // 
    } else {
      return num;
    }
  }

  // ! RESOLVE PLUGINS ISSUE FROM 'npm install --save chartjs-plugin-doughnutlabel'
  return (
    <div
      style={{
        maxHeight: "250px"
      }}
    >
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gridColumn: "1/-1",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <Typography variant="h4" lineHeight="35px">Total = {formatNumber(Object.values(data).shift(1))}</Typography>
          <Doughnut
            data={doughnutFakeData}
            style={{
              width: "100%",
              height: "100%",
              gridColumn: "1/-1",
              gridRow: "1/-1",
            }}
            options={option}
          />
        </>
      )}
    </div>
  );
}

export default DoughnutChart_Single_Point;