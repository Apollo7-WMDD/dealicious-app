import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";
import Campaign from "@/models/campaign";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantOwnerId = url.pathname.split("/")[4];

  try {
    await connect();

    // 1. retrieve the restaurant id using the user id
    const restaurantInfo = await Restaurant.findOne({
      userId: new mongoose.Types.ObjectId(restaurantOwnerId),
    }).select({
      name: 1,
      address: 1,
      qrCode: 1,
      businessHours: 1,
      email: 1,
      website: 1,
    });

    if (!restaurantInfo)
      return new NextResponse("Restaurant Not Found", { status: 200 });

    // 3. return the restaurant information and the restaurant id
    const restaId = restaurantOwnerId;
    return new NextResponse(JSON.stringify({ restaurantInfo, restaId }), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
