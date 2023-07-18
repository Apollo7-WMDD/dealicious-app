import { fetchAllCampaigns } from "@/lib/fetching/campaigns/data";
import { useStore } from "@/lib/context/user_context/store";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import LineChart from "../Chart/LineChart";

function HilightWrap() {
  const { restaurantOwnerId } = useStore();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAllCampaigns(restaurantOwnerId);
      console.log(result);
      setData(result ? result?.campaigns[0] : []);
    };
    fetchData();
  }, [restaurantOwnerId]);

  console.log(data);

  return (
    <div style={{ width: "100%" }}>
      <div>
        <Typography variant="h5">{data?.name}</Typography>
        <p
          style={{
            margin: "0",
            fontWeight: "lighter",
          }}
        >
          Item: {data?.offer}
        </p>
        {data?._id != undefined && (
          <p
            style={{
              margin: "0",
              fontWeight: "lighter",
            }}
          >
            Duration: {new Date(data.startDate).toISOString().substring(0, 10)}{" "}
            to {new Date(data.endDate).toISOString().substring(0, 10)}
          </p>
        )}

        <p
          style={{
            margin: "0",
            fontWeight: "lighter",
          }}
        >
          Users: {data?.allowNewCustomer ? "New Customers" : ""}
          {data?.allowNewCustomer && data?.allowSuperCustomer ? " & " : ""}
          {data?.allowSuperCustomer ? "Super Customers" : ""}
        </p>
        <p
          style={{
            margin: "0",
            fontWeight: "lighter",
          }}
        >
          Condition: {data?.description}
        </p>
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
