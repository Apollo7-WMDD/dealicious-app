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

    const restaurants = await Restaurant.find({
      superCustomerIdArray: {
        $in: [new mongoose.Types.ObjectId(superCustomerId)],
      },
    }).select({
      name: 1,
      _id: 1,
      logo: 1,
    });

    // Find the number of campaigns for each restaurant
    const promises = restaurants.map(async (restaurant) => {
      const campaignCount = await Campaign.countDocuments({
        restaurantId: new mongoose.Types.ObjectId(restaurant._id),
      });
      return { restaurant, campaignCount };
    });

    // Execute the promises concurrently
    const results = await Promise.all(promises);

    // Return the combined result
    return new NextResponse(JSON.stringify(results), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
