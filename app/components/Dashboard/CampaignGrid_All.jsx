"use client";
import { Box, Link, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useStore } from "@/lib/context/user_context/store";

import ChartCard_Insight from "@/app/components/Card/ChartCard_Insight";
import ChartCardTitle from "@/app/components/Chart/ChartCardTitle";
import CampaignCardBody from "../Chart/CampaignCardBody";

// fetch imports
import { fetchAllCampaigns,fetchTotalRevenueSingle } from "@/lib/fetching/campaigns/data";

function CampaignGrid({ children }) {
  const router = useRouter();
  const { restaurantOwnerId, restaurantId } = useStore();
  const [data, setData] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [hilighted, setHilighted] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAllCampaigns(restaurantOwnerId);
      const filteredResult = result.campaigns.sort(
        (b, a) => Date.parse(a.endDate) - Date.parse(b.endDate)
      );
      setData(filteredResult);
      setDataArray(filteredResult || []);
    };
    fetchData();
  }, [
    restaurantOwnerId,
    // , hilighted
  ]);
 

  console.log(data);
  console.log(dataArray);
  console.log(hilighted);

  useEffect(() => {
    dataArray.sort((a, b) => a.pinStatus - b.pinStatus);
  }, [hilighted]);

  // console.log(data);
  // console.log(dataArray);
  const theme = useTheme();
  const getPinIdSelected = (id) => {
    console.log("id is" + id);
    setHilighted([...hilighted, id]);
  };

  const onPinClickB = (id) => {
    setHilighted([...hilighted, id]);
  };
  // const navigate = (id) => {
  //   router.push(`/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId}/${id}`)
  // }

  return (
    <Box
      sx={{
        gridColumn: "span 3",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        width: "100%",
        gap: "1.5rem",
        gridAutoFlow: "row dense",

        // margin: "1.5rem 0",
        [theme.breakpoints.down("lg")]: {
          gridColumn: "span 2",
          gridTemplateColumns: "repeat(2, 1fr)",
        },
        [theme.breakpoints.down("md")]: {
          gridColumn: "span 1",
          gridTemplateColumns: "repeat(1, 1fr)",
        },
      }}
    >
      {dataArray.map(
        (e) =>
          hilighted == e.id && (
            <Link
              sx={{
                textDecoration: "none",
                textAlign: "left",
                cursor: "pointer",
              }}
              onClick={
                // navigate
                // navigate(e.id)
                () => {
                  router.push(
                    `/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId}/${e._id}`
                  );
                }
              }
            >
              {/* {e.name} */}
              <ChartCard_Insight
                key={e._id}
                style={{
                  ":hover": {
                    color: "hotpink",
                  },
                }}
              >
                <ChartCardTitle
                  data={e}
                  text={e.name}
                  onClick={
                    // navigate
                    // navigate(e.id)
                    () => {
                      router.push(
                        `/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId}/${e._id}`
                      );
                    }
                  }
                  pinStatus={hilighted == e._id ? true : false}
                  pinIdSelected={getPinIdSelected}
                  showPin={true}
                  onPinClick={onPinClickB}
                  style={{
                    ":hover": {
                      color: "hotpink",
                    },
                  }}
                ></ChartCardTitle>

                <CampaignCardBody>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "lighter",
                    }}
                  >
                    Item: {e.offer}
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "lighter",
                    }}
                  >
                    Duration:{" "}
                    {new Date(e.startDate).toISOString().substring(0, 10)} to{" "}
                    {new Date(e.endDate).toISOString().substring(0, 10)}
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "lighter",
                    }}
                  >
                    Users: {e.allowNewCustomer ? "New Customers" : ""}
                    {e.allowNewCustomer && e.allowSuperCustomer ? " & " : ""}
                    {e.allowSuperCustomer ? "Super Customers" : ""}
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "lighter",
                    }}
                  >
                    Condition: {e.description}
                  </p>
                </CampaignCardBody>
              </ChartCard_Insight>
            </Link>
          )
      )}{" "}
      {dataArray.map(
        (e) =>
          hilighted != e.id && (
            <Link
              sx={{
                textDecoration: "none",
                textAlign: "left",
                cursor: "pointer",
              }}
              onClick={
                // navigate
                // navigate(e.id)
                () => {
                  router.push(
                    `/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId}/${e._id}`
                  );
                }
              }
            >
              {/* {e.name} */}
              <ChartCard_Insight
                key={e._id}
                style={{
                  ":hover": {
                    color: "hotpink",
                  },
                }}
              >
                <ChartCardTitle
                  data={e}
                  text={e.name}
                  pinStatus={
                    hilighted == e._id
                      ? // (console.log("hilighted TRUE")) : (console.log("hilighted FASLE"))
                        true
                      : false
                  }
                  pinIdSelected={getPinIdSelected}
                  showPin={true}
                  onPinClick={onPinClickB}
                  style={{
                    ":hover": {
                      color: "hotpink",
                    },
                  }}
                ></ChartCardTitle>

                <CampaignCardBody>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "lighter",
                    }}
                  >
                    Item: {e.offer}
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "lighter",
                    }}
                  >
                    Duration:{" "}
                    {new Date(e.startDate).toISOString().substring(0, 10)} to{" "}
                    {new Date(e.endDate).toISOString().substring(0, 10)}
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "lighter",
                    }}
                  >
                    Users: {e.allowNewCustomer ? "New Customers" : ""}
                    {e.allowNewCustomer && e.allowSuperCustomer ? " & " : ""}
                    {e.allowSuperCustomer ? "Super Customers" : ""}
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "lighter",
                    }}
                  >
                    Condition: {e.description}
                  </p>
                </CampaignCardBody>
              </ChartCard_Insight>
            </Link>
          )
      )}
    </Box>
  );
}

export default CampaignGrid;
