import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Spending from "@/models/spending";

export const GET = async (request) => {
  const url = new URL(request.url);
  const campaignId = url.pathname.split("/")[5];

  try {
    await connect();

    // Aggregate the total revenue for super customers and non-super customers
    const [superCustomersRevenueResult, nonSuperCustomersRevenueResult] =
      await Promise.all([
        Spending.aggregate([
          {
            $match: {
              campaignId: new mongoose.Types.ObjectId(campaignId),
              isSuperCustomer: true,
            },
          },
          { $group: { _id: null, total: { $sum: "$billamount" } } },
        ]),
        Spending.aggregate([
          {
            $match: {
              campaignId: new mongoose.Types.ObjectId(campaignId),
              isSuperCustomer: false,
            },
          },
          { $group: { _id: null, total: { $sum: "$billamount" } } },
        ]),
      ]);

    // Calculate total revenue from both groups
    const superCustomersRevenue = superCustomersRevenueResult?.[0]?.total || 0;
    const nonSuperCustomersRevenue =
      nonSuperCustomersRevenueResult?.[0]?.total || 0;
    const totalRevenue = superCustomersRevenue + nonSuperCustomersRevenue;

    // Create the response object
    const response = {
      totalRevenue,
      superCustomersRevenue,
      nonSuperCustomersRevenue,
    };

    return new NextResponse(JSON.stringify(response, null, 2), {
      status: 200,
    });
  } catch (error) {
    console.log(error.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
