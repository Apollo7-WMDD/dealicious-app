import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import RedeemedCode from "@/models/redeemedPoints";

export const GET = async (request) => {
  try {
    await connect();
    // get the collection of movies without a Schema
    const redeemedCodes = await mongoose.connection.db
      .collection("redeemedCodes")
      .find({})
      .toArray();

    return new NextResponse(JSON.stringify(redeemedCodes), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const redeemedCodesCampaign = await request.json();

  try {
    const redeemedCodeNew = await new RedeemedCode({
      phone: redeemedCodesCampaign.phone,
      campaignId: redeemedCodesCampaign.campaignId,
      restaurantId: redeemedCodesCampaign.restaurantId,
      bill: redeemedCodesCampaign.bill,
      superCustomer: redeemedCodesCampaign.superCustomer,
    });

    await userNew.save();
    return new NextResponse(JSON.stringify(redeemedCodeNew), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};
