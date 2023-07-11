import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Spending from "@/models/spending";
import Restaurant from "@/models/restaurant";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantOwnerId = url.pathname.split("/")[5];

  try {
    await connect();

    const restaurant = await Restaurant.findOne(
      { userId: new mongoose.Types.ObjectId(restaurantOwnerId) },
      { _id: 1 }
    ).lean();

    if (!restaurant) {
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    const spendings = await Spending.aggregate([
      {
        $match: {
          restaurantId: restaurant._id,
        },
      },
      {
        $group: {
          _id: "$restaurantId",
          avgBillAmount: { $avg: "$billamount" },
          minBillAmount: { $min: "$billamount" },
          maxBillAmount: { $max: "$billamount" },
        },
      },
    ]);

    if (spendings.length === 0) {
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    return new NextResponse(JSON.stringify(spendings[0], null, 2), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
