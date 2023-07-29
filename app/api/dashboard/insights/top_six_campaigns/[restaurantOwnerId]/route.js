import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";
import Spending from "@/models/spending";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantOwner = url.pathname.split("/")[5];

  try {
    await connect();

    const restaurant = await Restaurant.findOne(
      { userId: restaurantOwner },
      { _id: 1 }
    );

    if (!restaurant) {
      return new NextResponse(JSON.stringify({ data: {} }), { status: 200 });
    }

    const restaurantId = restaurant._id;

    const campaigns = await Spending.aggregate([
      { $match: { restaurantId } },
      {
        $group: { _id: "$campaignId", totalSpending: { $sum: "$billamount" } },
      },
      {
        $lookup: {
          from: "campaigns",
          localField: "_id",
          foreignField: "_id",
          as: "campaign",
        },
      },
      { $unwind: "$campaign" },
      {
        $project: {
          _id: 0,
          campaignName: "$campaign.name",
          totalSpending: 1,
        },
      },
      { $sort: { totalSpending: -1 } },
      { $limit: 6 },
    ]);

    const totalRevenue = campaigns.reduce(
      (total, { totalSpending }) => total + totalSpending,
      0
    );

    const customers = await Spending.aggregate([
      { $match: { restaurantId } },
      { $group: { _id: null, totalCustomers: { $sum: 1 } } },
      { $project: { _id: 0, totalCustomers: 1 } },
    ]);

    const totalCustomers =
      customers.length > 0 ? customers[0].totalCustomers : 0;

    const response = {
      campaigns,
      totalRevenue,
      totalCustomers,
    };

    if (campaigns.length === 0) {
      response.campaigns = [];
    }

    return new NextResponse(JSON.stringify(response, null, 2), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
