import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";
import Campaign from "@/models/campaign";
import Spending from "@/models/spending";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantOwner = url.pathname.split("/")[5];

  try {
    await connect();

    // Find restaurantId from the restaurant collection
    const restaurant = await Restaurant.findOne(
      { userId: restaurantOwner },
      { _id: 1 }
    ).lean();

    if (!restaurant) {
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    // Generate the usage data for each campaign
    //  const usage_campaign = await generateUsageData("cid");

    let prevRevenue = 20;
    const daily = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date.toISOString().split('T')[0]; 
      prevRevenue -= Math.floor(Math.random() * 2);  
      return {
        date: formattedDate,
        totalRevenue: prevRevenue,
      };
    }).reverse();

    prevRevenue = 100;  
    const weekly = Array.from({ length: 12 }, (_, i) => {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - i * 7);
      const endOfWeek = new Date(startOfWeek);
      prevRevenue -= Math.random() * 10;  
      return {
        week: endOfWeek.toISOString().split('T')[0],
        totalRevenue: prevRevenue,
      };
    }).reverse();  

    prevRevenue = 1500;  
    const monthly = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      prevRevenue -= Math.random() * 100;  
      return {
        month: new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0],
        totalRevenue: prevRevenue,
      };
    }).reverse();

    return new NextResponse(JSON.stringify({ daily, weekly, monthly }), { 
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
