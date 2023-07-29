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
    fontWeight: "lighter",
  };

  return (
    <div style={{ width: "100%" }}>
      <div>
        <Typography variant="h5">{data?.name}</Typography>
        <p style={prgphStyle}>Item: {data?.offer}</p>
        {data?._id != null && (
          <p style={prgphStyle}>
            Duration: {new Date(data.startDate).toISOString().substring(0, 10)}{" "}
            to {new Date(data.endDate).toISOString().substring(0, 10)}
          </p>
        )}

        <p style={prgphStyle}>
          Users: {data?.allowNewCustomer ? "New Customers" : ""}
          {data?.allowNewCustomer && data?.allowSuperCustomer ? " & " : ""}
          {data?.allowSuperCustomer ? "Super Customers" : ""}
        </p>
        <p style={prgphStyle}>Condition: {data?.description}</p>
        <p
          style={{
            color: "red",
            margin: "0",
            fontSize: 10,
            textAlign: "right",
          }}
        >
          chart is mock up
        </p>
        <LineChart></LineChart>
      </div>
    </div>
  );
}

export default HilightWrap;
