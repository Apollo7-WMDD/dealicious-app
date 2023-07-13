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

    // Find restaurantId from the restaurant collection
    const restaurant = await Restaurant.findOne(
      { userId: restaurantOwner },
      { _id: 1 }
    ).lean();

    if (!restaurant) {
      // Return empty response if no restaurant info is found
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    const restaurantId = restaurant._id;

    // Find the campaigns for the restaurant and get the total revenue and customers, the revenue is in billamount and customers is in the number of spendings for the restaurantId, return the data in an object with the name of the campaign, the total revenue, the sum of all the spendings for the restaurant and the numbers of spendings for the restaurant, the billamount is in the spending collection
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

    // also return the sum of all the totalBillAmount and the sum of all the count
    const totalRevenue = campaigns.reduce(
      (acc, campaign) => acc + campaign.totalBillAmount,
      0
    );
    const totalCustomers = campaigns.reduce(
      (acc, campaign) => acc + campaign.count,
      0
    );

    // return the data in an object with the campaigns, the total revenue and the total customers
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
