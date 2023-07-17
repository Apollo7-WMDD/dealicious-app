import { NextResponse } from "next/server";
import connect from "@/utils/database";
import Restaurant from "@/models/restaurant";
import Spending from "@/models/spending";
import mongoose from "mongoose";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantId = url.pathname.split("/")[4];
  console.log("This is the restaurant Id", restaurantId);

  try {
    await connect();

    const today = new Date();
    // set the format
    today.setUTCHours(0, 0, 0, 0);
    // get the next day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    console.log(today);
    console.log(tomorrow);

    const spendings = await Spending.find({
      restaurantId,
      dateRedeemed: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    const sum = spendings.reduce(
      (total, spending) => total + spending.billamount,
      0
    );
    const numCustomers = spendings.length;

    // return empty object if no spendings
    if (spendings.length === 0) {
      return new NextResponse(JSON.stringify({}), { status: 200 });
    }
    const result = {
      sum,
      numCustomers,
    };

    return new NextResponse(JSON.stringify(result), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
