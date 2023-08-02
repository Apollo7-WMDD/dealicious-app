import { fetchAllCampaigns } from "@/lib/fetching/campaigns/data";
import { useStore } from "@/lib/context/user_context/store";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import LineChart from "../Chart/LineChart";

function HilightWrap() {
  const { restaurantOwnerId } = useStore();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAllCampaigns(restaurantOwnerId);
        if (result && result.campaigns && result.campaigns.length > 0) {
          setData(result.campaigns[0]);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      }
    };
    fetchData();
  }, [restaurantOwnerId]);

  const prgphStyle = {
    margin: "0",
    fontWeight: "bold",
  };

  return (
    <div style={{ width: "100%" }}>
      <div>
        <Typography variant="h5" sx={{mt:"1rem"}}>{data?.name}</Typography>
        <p style={prgphStyle}>
          Item:
          <p
            style={{
              margin: "0",
              fontWeight: "lighter",
              display: "inline",
            }}
          >{" "}
            {data?.offer}
          </p>
        </p>
        {data?._id != null && (
          <p style={prgphStyle}>
            Duration:
            <p
              style={{
                margin: "0",
                fontWeight: "lighter",
                display: "inline",
              }}
            >{" "}
              {new Date(data.startDate).toISOString().substring(0, 10)} to{" "}
              {new Date(data.endDate).toISOString().substring(0, 10)}
            </p>
          </p>
        )}

        <p style={prgphStyle}>
          Users:
          <p
            style={{
              margin: "0",
              fontWeight: "lighter",
              display: "inline",
            }}
          >{" "}
            {data?.allowNewCustomer ? "New Customers" : ""}
            {data?.allowNewCustomer && data?.allowSuperCustomer ? " & " : ""}
            {data?.allowSuperCustomer ? "Super Customers" : ""}
          </p>
        </p>
        <p style={prgphStyle}>
          Condition:
          <p
            style={{
              margin: "0",
              fontWeight: "lighter",
              display: "inline",
            }}
          >{" "}
            {data?.description}
          </p>
        </p>
       
        <LineChart></LineChart>
      </div>
    </div>
  );
}

export default HilightWrap;
