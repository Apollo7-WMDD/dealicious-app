import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";
import Campaign from "@/models/campaign";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantOwnerId = url.pathname.split("/")[5];

  try {
    await connect();

    // 1. retrieve the restaurant id using the user id
    const restaurantId = await Restaurant.findOne({
      userId: new mongoose.Types.ObjectId(restaurantOwnerId),
    }).select({ _id: 1 });

    if (!restaurantId)
      return new NextResponse("Restaurant not found", { status: 200 });

    // 2. retrieve all the active campaigns for the restaurant but only the name and the id
    const campaigns = await Campaign.find({
      restaurantId: restaurantId._id,
    }).select({
      name: 1,
      startDate: 1,
      endDate: 1,
      allowSuperCustomer: 1,
      allowNewCustomer: 1,
      status: 1,
    });

    if (!campaigns)
      return new NextResponse("Campaigns not found", { status: 200 });

    const restaId = restaurantId._id.toString();

    // 3. return the campaigns and the restaurant id
    return new NextResponse(JSON.stringify({ campaigns, restaId }), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
