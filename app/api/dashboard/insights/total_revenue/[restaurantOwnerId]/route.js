import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";
import Spending from "@/models/spending";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantOwner = url.pathname.split("/")[5];

  try {
    await connect();

    const restaurant = await Restaurant.findOne(
      { userId: restaurantOwner },
      { _id: 1 }
    );

    if (!restaurant) {
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    const restaurantId = restaurant._id;

    const pipeline = [
      {
        $match: {
          restaurantId,
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

  
    let prevRevenue = 5000;
    const daily = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date.toISOString().split('T')[0]; 
      prevRevenue -= Math.floor(Math.random() * 200);  
      return {
        date: formattedDate,
        totalRevenue: prevRevenue,
      };
    }).reverse();

  
    prevRevenue = 15000;  
    const weekly = Array.from({ length: 12 }, (_, i) => {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - i * 7);
      const endOfWeek = new Date(startOfWeek);
      prevRevenue -= Math.random() * 500;  
      return {
        week: endOfWeek.toISOString().split('T')[0],
        totalRevenue: prevRevenue,
      };
    }).reverse();  

    prevRevenue = 35000;  
    const monthly = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      prevRevenue -= Math.random() * 2000;  
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
