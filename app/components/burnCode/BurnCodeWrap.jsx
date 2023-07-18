"use client";

import { useStore } from "@/lib/context/user_context/store";
import { fetchUserCodes } from "@/lib/fetching/burncode/data";
import { useEffect, useState } from "react";
function BurnCodeWrap() {
  const { restaurantId } = useStore();
  console.log("restaurantId", restaurantId);
  const [data, setData] = useState({});
  console.log(restaurantId);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchUserCodes(restaurantId);
      setData(result);
    };
    fetchData();
  }, []);

  console.log("data: ", data);

  return <div></div>;
}

export default BurnCodeWrap;
