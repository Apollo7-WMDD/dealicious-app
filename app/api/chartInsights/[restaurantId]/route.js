import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Campaign from "@/models/campaign";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantId = url.pathname.split("/")[3];

  try {
    await connect();

    // 1. retrieve all the campaigns for the restaurant owner
    const campaigns = await Campaign.find({
      restaurantId: new mongoose.Types.ObjectId(restaurantId),
    }).select({
      name: 1,
      startDate: 1,
      endDate: 1,
      superCustomerPoints: 1,
      favorite: 1,
    });

    if (!campaigns)
      return new NextResponse("Campaigns not found", { status: 200 });
    // 3. return the campaigns and the restaurant id
    return new NextResponse(JSON.stringify(campaigns), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
