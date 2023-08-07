import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTheme, Typography } from "@mui/material";
import { fetchNumberOfCustomersSingle } from "../../../lib/fetching/insights/data";
import { useEffect, useState } from "react";
import Loader from "../Loader";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart_NumCustomer({ campaignId }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchNumberOfCustomersSingle(campaignId);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [campaignId]);

  const formatData = Object.values(data).slice(1);

  const theme = useTheme();
  defaults.font.family = theme.typography.fontFamily;
  defaults.font.size = theme.typography.fontSize;

  const doughnutFakeData = {
    labels: ["Super Customers", "New Customers"],
    datasets: [
      {
        data: formatData,
        backgroundColor: [
          theme.palette.primary[80],
          theme.palette.primary[100],
          theme.palette.primary[60],
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

  const centerText = {
    id: "centerText",
    afterDatasetsDraw(chart, args, pluginOption) {
      const { ctx } = chart;
      const text = Object.values(data)[1] + Object.values(data)[0];
      ctx.save();
      const x = chart.getDatasetMeta(0).data[0].x;
      const y = chart.getDatasetMeta(0).data[0].y;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 20px Ubuntu";
      ctx.fillText(text, x, y);
    },
  };
  const plugins = [centerText];
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
    // cutout: "60%",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(1,1fr)",
        position: "relative",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {isLoading ? (
        <div
          style={{
            maxHeight: "250px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <Doughnut
            data={doughnutFakeData}
            plugins={plugins}
            style={{
              width: "100%",
              height: "100%",
              gridColumn: "1/-1",
              gridRow: "1/-1",
              // marginTop: "2rem",
            }}
            options={option}
          />
        </>
      )}
    </div>
  );
}

export default DoughnutChart_NumCustomer;
