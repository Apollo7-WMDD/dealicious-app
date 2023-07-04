import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Spending from "@/models/spending";
import SuperCustomer from "@/models/superCustomer";
import Point from "@/models/points";
import Redeemed from "@/models/redeemedPoints";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantId = url.pathname.split("/")[5];

  try {
    await connect();

    const promises = [
      Spending.find({
        restaurantId: new mongoose.Types.ObjectId(restaurantId),
      }).select({
        billamount: 1,
        isSuperCustomer: 1,
        name: 1,
      }),

      SuperCustomer.find({
        restaurantIdArray: { $in: [new mongoose.Types.ObjectId(restaurantId)] },
      }).select({
        birthDate: 1,
      }),

      Point.find({
        restaurantId: new mongoose.Types.ObjectId(restaurantId),
      }).select({
        points: 1,
      }),

      Redeemed.find({
        restaurantId: new mongoose.Types.ObjectId(restaurantId),
      }).select({
        points: 1,
      }),
    ];

    // Execute the promises concurrently
    const [spending, superCustomers, points, redeemedPoints] =
      await Promise.all(promises);

    const results = {
      spending,
      superCustomers,
      points,
      redeemedPoints,
    };

    return new NextResponse(JSON.stringify(results), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
