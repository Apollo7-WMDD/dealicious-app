import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  defaults
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTheme } from "@mui/material";
import { fetchToImprove } from "../../../lib/fetching/insights/data";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/context/user_context/store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const { restaurantOwnerId } = useStore();
  const theme = useTheme();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchToImprove(restaurantOwnerId).then((res) => {
        let formattedData = [];
        for (const e in res) {
          console.log(e + " " + res[e]);
          let a = {
            label: e,
            data: [res[e]],
          };
          formattedData.push(a);
        }
        return formattedData;
      });

      setData(result);
    };
    fetchData();
  }, [restaurantOwnerId]);

  console.log(data);
  console.log(Object.keys(data));
  console.log(Object.values(data));

  defaults.font.family = theme.typography.fontFamily;
  defaults.font.size = theme.typography.fontSize;
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
      },
      x: {
        title: {
          display: false,
        },

        display: false,
      },
    },
    plugins: {
      labels: {
        display: false,
      },
      legend: {
        position: "right",
      },
      title: {
        display: false,
      },
    },
  };
  const labels = data.map((e) => e.label);
  let indexColor = -1;
  const barData = {
    labels: ["To improve"],
    datasets: data.map((e) => {
      const colorArray = [
        theme.palette.primary[80],
        theme.palette.primary[100],
        theme.palette.primary[60],
        theme.palette.primary[120],
      ];
      // const randomIndex = Math.floor(Math.random() * colorArray.length);
      indexColor++;
      return {
        label: e.label,
        data: e.data,
        backgroundColor: colorArray[indexColor],
      };
    }),
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Bar
        options={options}
        data={barData}
        style={{ height: "100%", width: "100%", 
        minHeight:"250px" 
      }}
      />
    </div>
  );
}

export default BarChart;
