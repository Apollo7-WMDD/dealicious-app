import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTheme, Typography } from "@mui/material";
import { fetchTopSixCampaigns } from "../../../lib/fetching/insights/data";
import { useEffect, useState, useRef } from "react";
import { useStore } from "@/lib/context/user_context/store";

function StackDoughNut() {
    const chartRef = useRef(null);
    // useEffect(() => {
    //     const chart = chartRef.current;
    
    //     if (!chart) {
    //       console.log('CanvasRenderingContext2D', chart.ctx);
    //       console.log('HTMLCanvasElement', chart.canvas);
    //     }

    //     const chartData = {
    //         ...data,
    //         datasets: data.datasets.map(dataset => ({
    //           ...dataset,
    //           borderColor: createGradient(chart.ctx, chart.chartArea),
    //         })),
    //       };
    //   }, []);
    
  const { restaurantOwnerId } = useStore();
  const [data, setData] = useState([]);
  console.log(restaurantOwnerId);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchTopSixCampaigns(restaurantOwnerId);
      setData(result);
    };
    fetchData();
  }, [restaurantOwnerId]);

  console.log(data);


  const dataDoughnut = {
    
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Weekly Sales',
      data: [18],
      backgroundColor: [
        theme.palette.primary[80],
        // 'rgba(54, 162, 235, 0.2)',
        // 'rgba(255, 206, 86, 0.2)',
        // 'rgba(75, 192, 192, 0.2)',
        // 'rgba(153, 102, 255, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
        // 'rgba(0, 0, 0, 0.2)'
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 0, 0, 1)'
      ],
      borderWidth: 1,
    //   circumference : (ctx)=>{
    //     console.log(ctx.datasets.data[0])
    //         return ctx.datasets.data[0]/18*270
    //   } 
    circumference : 270

    },
    {
        label: 'Weekly Sales',
        data: [12],
        backgroundColor: [
            theme.palette.primary[60],
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        //   'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 0, 0, 1)'
        ],
        borderWidth: 1,
        circumference : 270
  
      },
    {
        label: 'Weekly Sales',
        data: [9],
        backgroundColor: [
            theme.palette.primary[100],
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        //   'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 0, 0, 1)'
        ],
        borderWidth: 1,
        circumference : 270
  
      },
    {
        label: 'Weekly Sales',
        data: [5],
        backgroundColor: [
            theme.palette.primary[120],
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        //   'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 0, 0, 1)'
        ],
        borderWidth: 1,
        circumference : 270
  
      },
    ]
  };

  // config 
  const config = {
    type: 'bar',
    data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  return <div>
    <Doughnut ref={chartRef} data={dataDoughnut} options={config}></Doughnut>
  </div>;
}

export default StackDoughNut;
