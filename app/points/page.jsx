"use client";
import { useEffect, useState } from "react";

const PointsPage = () => {
  const [pointsData, setPointsData] = useState([]);

  useEffect(() => {
    const fetchPointsData = async () => {
      const res = await fetch("/api/points", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Something went wrong...");

      const data = await res.json();
      setPointsData(data);
    };
    fetchPointsData();
  }, []);

  return (
    <div>
      <h1>Points Data</h1>

      <ul>
        {pointsData.map((point, index) => (
          <li key={index}>
            Restaurant ID: {point.restaurantId} - Super Customer ID:{" "}
            {point.superCustomerId} - Points: {point.points}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PointsPage;
