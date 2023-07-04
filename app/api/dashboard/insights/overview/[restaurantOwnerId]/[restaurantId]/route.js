import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Spending from "@/models/spending";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantId = url.pathname.split("/")[6];

  try {
    await connect();

    // 1. retrieve the spending for the restaurant
    const spending = await Spending.find({
      restaurantId: new mongoose.Types.ObjectId(restaurantId),
    }).select({
      billamount: 1,
      isSuperCustomer: 1,
      campaignId: 1,
      suggestion: 1,
    });

    // 2. convert campaignId to string
    spending.forEach((spend) => {
      spend.campaignId = spend.campaignId.toString();
    });

    if (!spending)
      return new NextResponse("No Spendings for this restaurant", {
        status: 200,
      });

    // 3. return the spending for the restaurant
    return new NextResponse(JSON.stringify(spending), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
