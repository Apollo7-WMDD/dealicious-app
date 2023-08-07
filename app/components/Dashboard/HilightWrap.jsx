import { fetchAllCampaigns } from "@/lib/fetching/campaigns/data";
import { useStore } from "@/lib/context/user_context/store";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { fetchTotalRevenueSingle } from "@/lib/fetching/insights/data";
import SingleLineChart from "@/app/components/Chart/SingleLineChart";
import Loader from "../Loader";

function HilightWrap() {
  const { restaurantOwnerId } = useStore();
  const [data, setData] = useState(null);
  const [campaignId, setCampaignId] = useState(null);

  useEffect(() => {
    if (restaurantOwnerId) {
      const fetchData = async () => {
        try {
          const result = await fetchAllCampaigns(restaurantOwnerId);
          if (result && result.campaigns && result.campaigns.length > 0) {
            const filteredResult = result.campaigns.filter(
              (e) =>
                Date.parse(e.startDate) < Date.now() &&
                Date.parse(e.endDate) > Date.now()
            );

            setData(filteredResult[0]);
            setCampaignId(filteredResult[0]._id);
          } else {
            setData({
              allowNewCustomer: true,
              allowSuperCustomer: true,
              count: 6,
              description: "Coffee Shop Summer Offer",
              endDate: "2023-08-15T00:00:00.000Z",
              favorite: false,
              name: "TEST TEST TEST",
              offer:
                "Only for 2pm - 5pm: Get your drink at 20% off! Sip on the savings from 2023-08-05 to 2023-08-04. Hurry!",
              spending: 49999899899998,
              startDate: "2023-08-01T00:00:00.000Z",
              type: ["Seasonal Menu"],
              _id: "649cb83fed10c4f9baedfed6",
            });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setData({
            allowNewCustomer: true,
            allowSuperCustomer: true,
            count: 6,
            description: "Coffee Shop Summer Offer",
            endDate: "2023-08-15T00:00:00.000Z",
            favorite: false,
            name: "TEST2 TEST2 TEST2",
            offer:
              "Only for 2pm - 5pm: Get your drink at 20% off! Sip on the savings from 2023-08-05 to 2023-08-04. Hurry!",
            spending: 88888888,
            startDate: "2023-08-01T00:00:00.000Z",
            type: ["Seasonal Menu"],
            _id: "649cb83fed10c4f9baedfed6",
          });
        }
      };
      fetchData();
    } else {
      console.log("restaurantOwnerId is null");
      <Loader />;
    }
  }, [restaurantOwnerId]);

  console.log("hilightWrap - data", data);
  console.log("hilightWrap - data._id", data?._id);
  console.log("hilightWrap - data.description", data?.description);
  console.log("hilightWrap - data.spending", data?.spending);
  const prgphStyle = {
    margin: "0",
    fontWeight: "bold",
  };

  return (
    <div style={{ width: "100%" }}>
      <div>
        <Typography variant="h5" sx={{ mt: "1rem" }}>
          {data?.name}
        </Typography>
        <p style={prgphStyle}>
          Item:
          <p
            style={{
              margin: "0",
              fontWeight: "lighter",
              display: "inline",
            }}
          >
            {" "}
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
            >
              {" "}
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
          >
            {" "}
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
          >
            {" "}
            {data?.description}
          </p>
        </p>
        <Typography variant="h5" sx={{ mt: "1rem", textAlign: "center" }}>
          Campaign revenue
        </Typography>
        <SingleLineChart
          fetchDataSource={fetchTotalRevenueSingle}
          showTextSource={(s) => `$ ${data?.spending}`}
          campaignId={data?._id}
        />
        {/* <LineChart></LineChart> */}
      </div>
    </div>
  );
}

export default HilightWrap;
