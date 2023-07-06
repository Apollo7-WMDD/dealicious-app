import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";
import Campaign from "@/models/campaign";

export const GET = async (request) => {
  const url = new URL(request.url);
  const superCustomerId = url.pathname.split("/")[4];

  try {
    await connect();

    const restaurants = await Restaurant.aggregate([
      {
        $match: {
          superCustomerIdArray: {
            $in: [new mongoose.Types.ObjectId(superCustomerId)],
          },
        },
      },
      {
        $lookup: {
          from: "campaigns",
          localField: "_id",
          foreignField: "restaurantId",
          as: "campaigns",
        },
      },
      {
        $addFields: {
          campaignCount: { $size: "$campaigns" },
        },
      },
      {
        $project: {
          name: 1,
          _id: 1,
          logo: 1,
          campaignCount: 1,
        },
      },
    ]);

    const formattedRestaurants = restaurants.map((restaurant) => ({
      name: restaurant.name,
      _id: restaurant._id,
      logo: restaurant.logo,
      campaignCount: restaurant.campaignCount,
    }));

    // Return the nicely formatted JSON object
    return new NextResponse(JSON.stringify(formattedRestaurants, null, 2), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
  }
};
