import { NextResponse } from "next/server";
import connect from "@/utils/database";
import Restaurant from "@/models/restaurant";
import Campaign from "@/models/campaign";
import Spending from "@/models/spending";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantOwner = url.pathname.split("/")[5];

  try {
    await connect();

    const restaurant = await Restaurant.findOne(
      { userId: restaurantOwner },
      { _id: 1 }
    ).lean();

    if (!restaurant) {
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    const campaigns = await Campaign.aggregate([
      {
        $match: { restaurantId: restaurant._id },
      },
      {
        $lookup: {
          from: "spendings",
          let: { campaignId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$campaignId", "$$campaignId"] } } },
          ],
          as: "spendings",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          startDate: 1,
          endDate: 1,
          allowSuperCustomer: 1,
          allowNewCustomer: 1,
          offer: 1,
          type: 1,
          description: 1,
        },
      },
    ]);

    const response = {
      campaigns,
    };

    return new NextResponse(JSON.stringify(response, null, 2), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
