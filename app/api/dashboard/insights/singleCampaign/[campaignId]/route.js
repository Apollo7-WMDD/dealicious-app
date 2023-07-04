import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Campaign from "@/models/campaign";
import Spending from "@/models/spending";

export const GET = async (request) => {
  const url = new URL(request.url);
  const campaignId = url.pathname.split("/")[5];

  try {
    await connect();
    // 1. get the campaign using the campaignId and populate the spendings with pipeline
    const pipeline = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(campaignId),
        },
      },
      {
        $lookup: {
          from: "spendings",
          localField: "_id",
          foreignField: "campaignId",
          as: "spendings",
        },
      },
      {
        $project: {
          name: 1,
          startDate: 1,
          endDate: 1,
          superCustomerPoints: 1,
          spendings: {
            billamount: 1,
            isSuperCustomer: 1,
            name: 1,
            dateRedeemed: 1,
          },
        },
      },
    ];

    const campaigns = await Campaign.aggregate(pipeline);
    const singleCampaign = campaigns[0];

    if (!campaigns)
      return new NextResponse("Campaigns not found", { status: 200 });

    // 3. return the campaigns and the restaurant id
    return new NextResponse(JSON.stringify({ singleCampaign }), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
