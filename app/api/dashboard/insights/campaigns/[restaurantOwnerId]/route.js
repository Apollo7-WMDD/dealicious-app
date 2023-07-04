import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Campaign from "@/models/campaign";
import Spending from "@/models/spending";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantId = url.pathname.split("/")[5];

  try {
    await connect();

    // 2. retrieve all the active campaigns for the restaurant but only the name and the id
    const campaigns = await Campaign.find({
      restaurantId: new mongoose.Types.ObjectId(restaurantId),
    }).select({
      _id: 1,
      name: 1,
      startDate: 1,
      endDate: 1,
      favorite: 1,
    });

    const spending = await Spending.find({
      restaurantId: new mongoose.Types.ObjectId(restaurantId),
    }).select({
      billamount: 1,
      campaignId: 1,
    });

    if (!campaigns)
      return new NextResponse("Campaigns not found", { status: 200 });

    // 3. return the campaigns and the restaurant id
    return new NextResponse(JSON.stringify({ campaigns, spending }), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
