import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTheme, Typography, Box } from "@mui/material";
import { fetchTopSixCampaigns } from "../../../lib/fetching/insights/data";
import { useEffect, useState, useRef } from "react";
import { useStore } from "@/lib/context/user_context/store";
import Rectangle from "@/app/components/svg/Rectangle.svg";
import Loader from "../Loader";

function StackDougnNutSpan1() {
  const { restaurantOwnerId } = useStore();
  const [data, setData] = useState([]);
  const [campaignArray, setCampaignArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await fetchTopSixCampaigns(restaurantOwnerId).then(
        (res) => {
          let formattedData = [];
          res.campaigns.forEach((element) => {
            let a = {
              campaignName: element.campaignName,
              totalSpending: element.totalSpending,
            };
            formattedData.push(a);
          });
          setCampaignArray(formattedData);
          return res;
        }
      );

      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, [restaurantOwnerId]);

  defaults.font.family = theme.typography.fontFamily;
  defaults.font.size = theme.typography.fontSize;

  console.log(data);

  let indexColor = -1;
  const colorArray = [
    theme.palette.primary[80],
    theme.palette.primary[100],
    theme.palette.primary[60],
    theme.palette.primary[120],
    theme.palette.primary[40],
    theme.palette.primary[20],
  ];

  const dataDoughnut = {
    labels: ["Revenue"],
    datasets: campaignArray.map((e) => {
      let highestSpending = 0;
      campaignArray.forEach((element) => {
        if (element.totalSpending > highestSpending) {
          highestSpending = element.totalSpending;
        }
      });

      indexColor++;
      if (indexColor > 5) {
        indexColor = 0;
      }
      return {
        label: e.campaignName,
        data: [e.totalSpending],
        backgroundColor: colorArray[indexColor],
        borderColor: [theme.palette.background.default],
        borderWidth: 5,
        circumference: (ctx) => {
          return (ctx.dataset.data[0] / highestSpending) * 260;
        },
      };
    }),
  };

  indexColor = -1;

  // config
  const config = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          display: true,
          boxWidth: 0,
          usePointStyle: false,
          pointSytle: "rectRounded",
        },
      },
    },
  };

  return (
    <Box
      sx={{
        display: "grid",
        width: "100%",
        gap: "0.5rem",
        justifyContent: "center",
        gridTemplateColumns: "repeat(1, 1fr)",
        [theme.breakpoints.down("lg")]: {
          gridTemplateColumns: "1fr 2fr",
        },
        [theme.breakpoints.down("md")]: {
          gridTemplateColumns: "repeat(1, 1fr)",
        },
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              marginTop: "1.5rem",
              textAlign: "center",

              [theme.breakpoints.down("lg")]: {
                gridTemplateColumns: "repeat(1, 1fr)",
              },

              [theme.breakpoints.down("md")]: {
                gridTemplateColumns: "repeat(2, 1fr)",
              },
            }}
          >
            <Box>
              <Typography variant="h5">Total Revenue</Typography>
              <Typography variant="h3">{data.totalRevenue}</Typography>
            </Box>
            <Box>
              <Typography variant="h5">Customers </Typography>
              <Typography variant="h3">{data.totalCustomers}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "1.5rem",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(1,1fr)",
              gridTemplateRows: "repeat(2,auto)",
              justifyItems: "center",
              [theme.breakpoints.down("lg")]: {
                gridTemplateRows: "repeat(2,auto)",
              },
              [theme.breakpoints.down("md")]: {
                gridTemplateRows: "repeat(2,auto)",
              },
            }}
          >
            <Box
              sx={{
                width: "70%",
                justifyContent: "start",
                alignItems: "start",
                //position:"absolute", zIndex:"1" ,
                gridRow: "1/2",
                gridColumn: "1/-1",
                zIndex: 1,
                [theme.breakpoints.down("lg")]: {
                  width: "100%",
                  // gridTemplateColumns: "repeat(1, 1fr)",
                },
                [theme.breakpoints.down("md")]: {
                  gridRow: "1",
                  // gridTemplateColumns: "repeat(1, 1fr)",
                },
              }}
            >
              {campaignArray.map((e) => (
                <Box
                  key={e.campaignName}
                  sx={{ display: "flex", alignItems: "center", gap: "0.15rem" }}
                >
                  {/* {console.log(indexColor)
            
            } */}
                  {/* {indexColor=-1} */}
                  <Rectangle
                    indexColor={indexColor++}
                    style={{
                      // color:"hotpink"

                      color: colorArray[indexColor],
                      display: "inline-block",
                    }}
                  />

                  <p
                    style={{
                      textAlign: "left",
                      margin: "0",
                      display: "inline",
                      fontSize: 14,
                    }}
                  >
                    {e.campaignName}
                  </p>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                gridRow: "2/-1",
                gridColumn: "1/-1",
                [theme.breakpoints.down("lg")]: {
                  width: "80%",
                  // gridTemplateColumns: "repeat(1, 1fr)",
                },
                [theme.breakpoints.down("md")]: {
                  gridRow: "2",
                  // gridTemplateColumns: "repeat(1, 1fr)",
                },
              }}
            >
              <Doughnut
                data={dataDoughnut}
                options={config}
                style={{
                  width: "100%",
                  minHeight: "250px",
                  // gridRow: "1/-1",
                  // gridColumn: "1/-1",
                }}
              ></Doughnut>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default StackDougnNutSpan1;
