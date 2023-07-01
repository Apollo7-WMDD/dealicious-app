import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Campaign from "@/models/campaign";

export const POST = async (request) => {
  const campaign = await request.json();

  try {
    await connect();

    const campaignNew = await new Campaign({
      restaurantId: new mongoose.Types.ObjectId(campaign.restaurantId),
      superCustomerIdArray: [
        new mongoose.Types.ObjectId(campaign.superCustomerIdArray[0]),
        new mongoose.Types.ObjectId(campaign.superCustomerIdArray[1]),
      ],
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

    await campaignNew.save();
    return new NextResponse(JSON.stringify(campaignNew), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};
