import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Spending from "@/models/spending";
import Restaurant from "@/models/restaurant";

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

    const result = await Spending.aggregate([
      { $match: { restaurantId } },
      { $project: { _id: 0, suggestion: 1 } },
      { $replaceRoot: { newRoot: "$suggestion" } },
      { $addFields: { suggestionKeys: { $objectToArray: "$$ROOT" } } },
      { $unwind: "$suggestionKeys" },
      { $match: { "suggestionKeys.v": true } },
      {
        $group: {
          _id: "$suggestionKeys.k",
          count: { $sum: 1 },
        },
      },
    ]).hint({ restaurantId: 1 });

    const response = result.reduce((acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    }, {});

    return new NextResponse(JSON.stringify(response, null, 2), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
