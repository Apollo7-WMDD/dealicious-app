import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantId = url.pathname.split("/")[5];

  try {
    await connect();

    const restaurantInfo = await Restaurant.findOne({
      _id: new mongoose.Types.ObjectId(restaurantId),
    })
      .select({
        name: 1,
        category: 1,
        manager: 1, 
        website: 1,
        email: 1,
        address: 1,
        phone: 1,
        logo: 1, 
        businessHours: 1,
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
