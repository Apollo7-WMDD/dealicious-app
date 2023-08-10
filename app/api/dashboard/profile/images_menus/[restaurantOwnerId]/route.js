import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantOwnerId = url.pathname.split("/")[5];

  try {
    if (
      !restaurantOwnerId ||
      !mongoose.Types.ObjectId.isValid(restaurantOwnerId)
    ) {
      return new NextResponse(JSON.stringify({}), { status: 200 });
    }

    await connect();

    const restaurantInfo = await Restaurant.findOne({
      userId: new mongoose.Types.ObjectId(restaurantOwnerId),
    })
      .select({
        logo: 1,
        menu: 1,
      })
      .lean();

    if (!restaurantInfo) {
      // Return empty response if no restaurant info is found
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    // Return the response as JSON
    return new NextResponse(JSON.stringify({ restaurantInfo }), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(JSON.stringify({ error: "Database Error" }), {
      status: 500,
    });
  }
};
