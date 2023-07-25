import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    defaults,
  } from "chart.js";
  import { Doughnut } from "react-chartjs-2";
  import { useTheme, Typography } from "@mui/material";
  import { fetchCustomerSpendings } from "../../../lib/fetching/insights/data";
  import { useEffect, useState } from "react";
  import { useStore } from "@/lib/context/user_context/store";
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
function CustomerSpending() {
    const { restaurantOwnerId } = useStore();
    const [data, setData] = useState([]);
    console.log(restaurantOwnerId);
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await fetchCustomerSpendings(restaurantOwnerId);
        setData(result);
      };
      fetchData();
    }, [restaurantOwnerId]);
  
    console.log(data);
  
    const formatData = Object.values(data).slice(1);
    console.log(formatData);
  
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
      cutout: "60%",
    };

  // convert to K for number from > 1000 
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
        <Typography variant="h4" lineHeight="35px">Total = $ {formatNumber(Object.values(data).shift(1))}</Typography>
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
      </div>
    );
  }
  
  export default CustomerSpending;
  