import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Campaign from "@/models/campaign";
import Spending from "@/models/spending";
import Restaurant from "@/models/restaurant";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantOwner = url.pathname.split("/")[5];

  try {
    await connect();

    const restaurant = await Restaurant.findOne({
      restaurantOwner: new mongoose.Types.ObjectId(restaurantOwner),
    }).lean();

    const restaurantId = restaurant._id;

    const campaignIds = await Campaign.find(
      { restaurantId: new mongoose.Types.ObjectId(restaurantId) },
      { _id: 1 }
    ).lean();

    const campaignIdsList = campaignIds.map((campaign) => campaign._id);

    const spending = await Spending.aggregate([
      {
        $match: {
          restaurantId: new mongoose.Types.ObjectId(restaurantId),
          campaignId: { $in: campaignIdsList },
        },
      },
      {
        $group: {
          _id: "$campaignId",
          totalSpending: { $sum: "$billamount" },
        },
      },
      {
        $lookup: {
          from: "campaigns",
          localField: "_id",
          foreignField: "_id",
          as: "campaign",
        },
      },
      {
        $project: {
          _id: 1,
          name: { $arrayElemAt: ["$campaign.name", 0] },
          startDate: { $arrayElemAt: ["$campaign.startDate", 0] },
          endDate: { $arrayElemAt: ["$campaign.endDate", 0] },
          favorite: { $arrayElemAt: ["$campaign.favorite", 0] },
          type: { $arrayElemAt: ["$campaign.type", 0] },
          totalSpending: 1,
        },
      },
    ]);

    return new NextResponse(JSON.stringify(spending), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
