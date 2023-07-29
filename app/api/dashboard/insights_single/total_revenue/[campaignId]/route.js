import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";
import Spending from "@/models/spending";

export const GET = async (request) => {
  const url = new URL(request.url);
  const campaignId = url.pathname.split("/")[5];

  try {
    await connect();

    const pipeline = [
      {
        $match: {
          campaignId: new mongoose.Types.ObjectId(campaignId),
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$billamount" },
        },
      },
    ];

    const [result] = await Spending.aggregate(pipeline).allowDiskUse(true);

    let prevRevenue = 100;
    const daily = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date.toISOString().split('T')[0]; 
      prevRevenue -= Math.floor(Math.random() * 5);  
      return {
        date: formattedDate,
        totalRevenue: prevRevenue,
      };
    }).reverse();

  
    prevRevenue = 800;  
    const weekly = Array.from({ length: 12 }, (_, i) => {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - i * 7);
      const endOfWeek = new Date(startOfWeek);
      prevRevenue -= Math.random() * 50;  
      return {
        week: endOfWeek.toISOString().split('T')[0],
        totalRevenue: prevRevenue,
      };
    }).reverse();  

    prevRevenue = 3000;  
    const monthly = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      prevRevenue -= Math.random() * 200;  
      return {
        month: new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0],
        totalRevenue: prevRevenue,
      };
    }).reverse();

    const response = {
      totalRevenue: result ? result.totalRevenue : 0,
      daily,
      weekly,
      monthly,
    };

    return new NextResponse(JSON.stringify(response, null, 2), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
