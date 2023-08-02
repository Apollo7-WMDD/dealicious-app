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

    // 1. Find restaurantId from the restaurant collection
    const restaurant = await Restaurant.findOne(
      { userId: restaurantOwner },
      { _id: 1 }
    ).lean();

    if (!restaurant) {
      // 2. Return empty response if no restaurant info is found
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    const restaurantId = restaurant._id;

    const campaigns = await Campaign.aggregate([
      { $match: { restaurantId: restaurantId } },
      {
        $lookup: {
          from: "spendings",
          let: { campaignId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$campaignId", "$$campaignId"] } } },
            {
              $group: {
                _id: null,
                totalBillAmount: { $sum: "$billamount" },
                count: { $sum: 1 },
              },
            },
          ],
          as: "spendings",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          totalBillAmount: {
            $ifNull: [{ $arrayElemAt: ["$spendings.totalBillAmount", 0] }, 0],
          },
          count: { $ifNull: [{ $arrayElemAt: ["$spendings.count", 0] }, 0] },
        },
      },
    ]);

    // 3.  return the sum of all the totalBillAmount and the sum of all the count
    const totalRevenue = campaigns.reduce(
      (acc, campaign) => acc + campaign.totalBillAmount,
      0
    );

    const totalCustomers = campaigns.reduce(
      (acc, campaign) => acc + campaign.count,
      0
    );

    // 4. return the data in an object with the campaigns, the total revenue and the total customers
    return new NextResponse(
      JSON.stringify({
        campaigns,
        totalRevenue,
        totalCustomers,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
