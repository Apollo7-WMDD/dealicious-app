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

    const promises = [
      // 1. total revenue for the campaign sum of billamount
      Spending.aggregate([
        {
          $match: {
            campaignId: new mongoose.Types.ObjectId(campaignId),
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$billamount" },
          },
        },
      ]),

      // 2. customer count of super customers and non super customers based on the property isSuperCustomer
      Spending.aggregate([
        {
          $match: {
            campaignId: new mongoose.Types.ObjectId(campaignId),
          },
        },
        {
          $group: {
            _id: "$isSuperCustomer",
            count: { $sum: 1 },
          },
        },
      ]),

      // 3. amount of points earned by super customers considering that every 1 dollar spent is 1 point
      Spending.aggregate([
        {
          $match: {
            campaignId: new mongoose.Types.ObjectId(campaignId),
            isSuperCustomer: true,
          },
        },
        {
          $group: {
            _id: null,
            totalPoints: { $sum: "$billamount" },
          },
        },
      ]),

      // 4. average bill size for the campaign
      Spending.aggregate([
        {
          $match: {
            campaignId: new mongoose.Types.ObjectId(campaignId),
          },
        },
        {
          $group: {
            _id: null,
            averageBillSize: { $avg: "$billamount" },
          },
        },
      ]),

      // 5. customer campaign usage by retrieving the dateRedeemed property for each customer
      Spending.aggregate([
        {
          $match: {
            campaignId: new mongoose.Types.ObjectId(campaignId),
          },
        },
        {
          $group: {
            _id: null,
            redeemedDates: { $push: "$dateRedeemed" },
          },
        },
      ]),

      // 6. get the top 6 super customers based on the billamount retrieve the name only
      Spending.aggregate([
        {
          $match: {
            campaignId: new mongoose.Types.ObjectId(campaignId),
            isSuperCustomer: true,
          },
        },
        {
          $group: {
            _id: "$name",
            totalSpending: { $sum: "$billamount" },
          },
        },
        {
          $sort: {
            totalSpending: -1,
          },
        },
        {
          $limit: 6,
        },
      ]),
    ];

    const [
      totalRevenue,
      customerCount,
      totalPoints,
      averageBillSize,
      redeemedDates,
      topCustomers,
    ] = await Promise.all(promises);

    // 7. send the data to the client
    const singleCampaign = {
      totalRevenue: totalRevenue[0]?.totalRevenue || 0,
      customerCount: {
        superCustomers:
          customerCount.find((item) => item._id === true)?.count || 0,
        nonSuperCustomers:
          customerCount.find((item) => item._id === false)?.count || 0,
      },
      totalPointsSuperCustomer: totalPoints[0]?.totalPoints || 0,
      averageBillSize: averageBillSize[0]?.averageBillSize || 0,
      customerCampaignUsage: redeemedDates[0]?.redeemedDates || [],
      topCustomers: topCustomers.map((customer) => ({
        name: customer._id,
        totalSpending: customer.totalSpending,
      })),
    };

    // 3. return the campaigns and the restaurant id
    return new NextResponse(JSON.stringify({ singleCampaign }), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
