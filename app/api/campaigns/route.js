import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Campaign from "@/models/campaign";

export const GET = async (request) => {
  try {
    await connect();
    // get the collection of movies without a Schema
    const campaigns = await mongoose.connection.db
      .collection("campaigns")
      .find({})
      .toArray();

    return new NextResponse(JSON.stringify(campaigns), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const campaignInfo = await request.json();

  try {
    const campaign = await mongoose.connection.db
      .collection("campaigns")
      .findOne({ name: campaignInfo.name });

    if (campaign) throw new Error("Campaign already exists!");

    const campaignNew = await new Campaign({
      restaurantId: campaignInfo.restaurantId,
      name: campaignInfo.name,
      campaignStatus: campaignInfo.campaignStatus,
      type: campaignInfo.type,
      offer: campaignInfo.offer,
      allowSuperCustomer: campaignInfo.allowSuperCustomer,
      allowNewCustomer: campaignInfo.allowNewCustomer,
      expiredByNumber: campaignInfo.expiredByNumber,
      availableCodes: campaignInfo.availableCodes,
      startDate: campaignInfo.startDate,
      endDate: campaignInfo.endDate,
      media: campaignInfo.media,
      description: campaignInfo.description,
    });

    await campaignNew.save();
    return new NextResponse(JSON.stringify(campaignNew), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};
