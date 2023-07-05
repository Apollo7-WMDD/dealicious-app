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

    const campaigns = await Campaign.aggregate([
      {
        $match: {
          restaurantId: new mongoose.Types.ObjectId(restaurantId),
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          startDate: 1,
          endDate: 1,
          favorite: 1,
        },
      },
    ]);

    const campaignIds = campaigns.map((campaign) => campaign._id);

    const spending = await Spending.aggregate([
      {
        $match: {
          restaurantId: new mongoose.Types.ObjectId(restaurantId),
          campaignId: { $in: campaignIds },
        },
      },
      {
        $group: {
          _id: "$campaignId",
          totalSpending: { $sum: "$billamount" },
        },
      },
    ]);

    const campaignMap = new Map();
    campaigns.forEach((campaign) => {
      campaignMap.set(campaign._id.toString(), campaign);
    });

    const result = spending.map((spendingItem) => {
      const campaignId = spendingItem._id.toString();
      const campaign = campaignMap.get(campaignId);

      const billamount = spendingItem.totalSpending || 0;

      return {
        _id: campaignId,
        name: campaign.name,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        favorite: campaign.favorite,
        billamount,
      };
    });

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
