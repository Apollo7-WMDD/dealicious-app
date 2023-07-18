import { NextResponse } from "next/server";
import connect from "@/utils/database";
import Restaurant from "@/models/restaurant";
import Spending from "@/models/spending";
import mongoose from "mongoose";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantId = url.pathname.split("/")[4];

  try {
    await connect();

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    console.log(today);

    const spendings = await Spending.find({
      restaurantId: new mongoose.Types.ObjectId(restaurantId),
      dateRedeemed: {
        $gte: today,
        $lte: new Date(today.getTime() + 24 * 60 * 60 * 1000),
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
