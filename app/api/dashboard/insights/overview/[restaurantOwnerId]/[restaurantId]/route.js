import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Spending from "@/models/spending";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantId = url.pathname.split("/")[6];

  try {
    await connect();

    const promises = [
      Spending.aggregate([
        {
          $match: {
            restaurantId: new mongoose.Types.ObjectId(restaurantId),
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$billamount" },
          },
        },
      ]).exec(),

      Spending.aggregate([
        {
          $match: {
            restaurantId: new mongoose.Types.ObjectId(restaurantId),
          },
        },
        {
          $group: {
            _id: null,
            averageBillSize: { $avg: "$billamount" },
          },
        },
      ]).exec(),

      Spending.aggregate([
        {
          $match: {
            restaurantId: new mongoose.Types.ObjectId(restaurantId),
          },
        },
        {
          $group: {
            _id: "$isSuperCustomer",
            totalSpending: { $sum: "$billamount" },
          },
        },
      ]).exec(),

      Spending.aggregate([
        {
          $match: {
            restaurantId: new mongoose.Types.ObjectId(restaurantId),
          },
        },
        {
          $group: {
            _id: "$isSuperCustomer",
            count: { $sum: 1 },
          },
        },
      ]).exec(),

      Spending.aggregate([
        {
          $match: {
            restaurantId: new mongoose.Types.ObjectId(restaurantId),
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
          $unwind: "$campaign",
        },
        {
          $project: {
            _id: 0,
            campaignName: "$campaign.name",
            totalSpending: 1,
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
      ]).exec(),

      Spending.aggregate([
        {
          $match: {
            restaurantId: new mongoose.Types.ObjectId(restaurantId),
          },
        },
        {
          $group: {
            _id: "$campaignId",
            redeemedDates: { $push: "$dateRedeemed" },
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
          $unwind: "$campaign",
        },
        {
          $project: {
            campaignName: "$campaign.name",
            redeemedDates: 1,
            _id: 0,
          },
        },
      ]).exec(),

      Spending.aggregate([
        {
          $match: {
            restaurantId: new mongoose.Types.ObjectId(restaurantId),
          },
        },
        {
          $group: {
            _id: null,
            foodQualityCount: {
              $sum: {
                $cond: [{ $ifNull: ["$suggestion.foodQuality", false] }, 1, 0],
              },
            },
            foodQuantityCount: {
              $sum: {
                $cond: [{ $ifNull: ["$suggestion.foodQuantity", false] }, 1, 0],
              },
            },
            serviceCount: {
              $sum: {
                $cond: [{ $ifNull: ["$suggestion.service", false] }, 1, 0],
              },
            },
            placeCount: {
              $sum: {
                $cond: [{ $ifNull: ["$suggestion.place", false] }, 1, 0],
              },
            },
            otherCount: {
              $sum: {
                $cond: [{ $ifNull: ["$suggestion.other", false] }, 1, 0],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            foodQualityCount: 1,
            foodQuantityCount: 1,
            serviceCount: 1,
            placeCount: 1,
            otherCount: 1,
          },
        },
      ]).exec(),
    ];

    const [
      totalRevenue,
      averageBillSize,
      customerSpendings,
      customerCount,
      topCampaigns,
      campaignUsage,
      opportunities,
    ] = await Promise.all(promises);

    const result = {
      totalRevenue: totalRevenue[0]?.totalRevenue || 0,
      averageBillSize: averageBillSize[0]?.averageBillSize || 0,
      customerSpendings: {
        superCustomers:
          customerSpendings.find((item) => item._id === true)?.totalSpending ||
          0,
        nonSuperCustomers:
          customerSpendings.find((item) => item._id === false)?.totalSpending ||
          0,
      },
      customerCount: {
        superCustomers:
          customerCount.find((item) => item._id === true)?.count || 0,
        nonSuperCustomers:
          customerCount.find((item) => item._id === false)?.count || 0,
      },
      topCampaigns: topCampaigns.map((campaign) => ({
        campaignName: campaign.campaignName,
        totalSpending: campaign.totalSpending,
      })),
      campaignUsage: campaignUsage.reduce((acc, campaign) => {
        acc[campaign.campaignName] = campaign.redeemedDates;
        return acc;
      }, {}),
      opportunities: opportunities[0] || {
        foodQualityCount: 0,
        foodQuantityCount: 0,
        serviceCount: 0,
        placeCount: 0,
        otherCount: 0,
      },
    };

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
