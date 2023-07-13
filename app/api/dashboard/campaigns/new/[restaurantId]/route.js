import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Campaign from "@/models/campaign";

export const POST = async (req) => {
  try {
    await connect();
    const campaign = await req.json();
    // Check for required fields or handle empty values
    if (
      !campaign.restaurantId ||
      !campaign.name ||
      !campaign.startDate ||
      !campaign.endDate
    ) {
      return new NextResponse(400, { message: "Missing required fields" });
    }

    const newCampaign = new Campaign({
      restaurantId: new mongoose.Types.ObjectId(campaign.restaurantId),
      superCustomerId:
        campaign.superCustomerIdArray ??
        new mongoose.Types.ObjectId(campaign.superCustomerIdArray),
      name: campaign.name,
      status: campaign.status,
      type: campaign.type,
      offer: campaign.offer,
      allowSuperCustomer: campaign.allowSuperCustomer,
      allowNewCustomer: campaign.allowNewCustomer,
      expiredByNumber: campaign.expiredByNumber,
      availableCodes: campaign.availableCodes,
      superCustomerPoints: campaign.superCustomerPoints,
      state: campaign.state,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      media: campaign.media,
      description: campaign.description,
      favorite: campaign.favorite,
      autoDescription: campaign.autoDescription,
    });

    await newCampaign.save();
    return new NextResponse(200, { message: "Campaign created successfully" });
  } catch (error) {
    return new NextResponse(500, {
      message: "Error creating campaign, check the inputs",
    });
  }
};
