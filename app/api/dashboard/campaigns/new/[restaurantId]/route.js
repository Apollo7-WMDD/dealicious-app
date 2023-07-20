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

    console.log(campaign.condition);
    const newCampaign = new Campaign({
      restaurantId: new mongoose.Types.ObjectId(campaign.restaurantId),
      superCustomerIdArray: campaign.superCustomerIdArray 
      ? campaign.superCustomerIdArray.map(id => new mongoose.Types.ObjectId(id))
      : [],
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
      condition: campaign.condition,
      favorite: campaign.favorite,
      autoDescription: campaign.autoDescription,
    });
    console.log("New Campaign",newCampaign);
    await newCampaign.save();
    return new NextResponse(200, { message: "Campaign created successfully" });
  } catch (error) {
    console.error('Error creating campaign:', error); 
    return new NextResponse(500, {
      message: "Error creating campaign, check the inputs",
      error: error.message, 
    });
  }  
};
