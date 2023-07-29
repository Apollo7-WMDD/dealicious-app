import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";
import Point from "@/models/points";
import Redeemed from "@/models/redeemedPoints";

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

    const [totalPointsResult, totalRedeemedPointsResult] = await Promise.all([
      Point.aggregate([
        {
          $match: {
            restaurantId: new mongoose.Types.ObjectId(restaurantId),
          },
        },
        {
          $group: {
            _id: null,
            totalPoints: { $sum: "$points" },
          },
        },
      ]),
      Redeemed.aggregate([
        {
          $match: {
            restaurantId: new mongoose.Types.ObjectId(restaurantId),
          },
        },
        {
          $group: {
            _id: null,
            totalRedeemedPoints: { $sum: "$points" },
          },
        },
      ]),
    ]);

    // const totalPoints = totalPointsResult.length
    //   ? totalPointsResult[0].totalPoints
    //   : 0;
    // const totalRedeemedPoints = totalRedeemedPointsResult.length
    //   ? totalRedeemedPointsResult[0].totalRedeemedPoints
    //   : 0;
    const totalRedeemedPoints = Math.floor(Math.random() * 100);
    const totalPoints = Math.floor(Math.random() * 300);

    return new NextResponse(
      JSON.stringify({
        totalPoints,
        totalRedeemedPoints,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
