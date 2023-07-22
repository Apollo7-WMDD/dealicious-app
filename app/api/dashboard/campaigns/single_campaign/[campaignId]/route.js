import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Campaign from "@/models/campaign";

export const GET = async (request) => {
  const url = new URL(request.url);
  const campaignId = url.pathname.split("/")[5];

  try {
    await connect();

    const campaignInfo = await Campaign.findOne({
      _id: new mongoose.Types.ObjectId(campaignId),
    })
      .select({
        restaurantId: 1,
        superCustomerIdArray: 1,
        name: 1,
        status: 1,
        type: 1,
        offer: 1,
        allowSuperCustomer: 1,
        allowNewCustomer: 1,
        expiredByNumber: 1,
        availableCodes: 1,
        superCustomerPoints: 1,
        state: 1,
        startDate: 1,
        endDate: 1,
        media: 1,
        description: 1,
        condition: 1,
        favorite: 1,
        autoDescription: 1,
      })
      .lean();

    if (!campaignInfo) {
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    return new NextResponse(JSON.stringify({ campaignInfo }), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(JSON.stringify({ error: "Database Error" }), {
      status: 500,
    });
  }
};
