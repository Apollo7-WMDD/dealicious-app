import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Spending from "@/models/spending";
import Restaurant from "@/models/restaurant";

export const GET = async (request) => {
  const url = new URL(request.url);
  const campaignId = url.pathname.split("/")[5];

  try {
    await connect();
    // get the total revenue of super customers and non super customers from the spending collection using the billamount field and query with the campaignId
    const [superCustomersRevenue, nonSuperCustomersRevenue] = await Promise.all(
      [
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
      ]
    );

    // Check if there is only one type of user (either all super customers or all non-super customers)
    if (
      superCustomersRevenue.length === 0 &&
      nonSuperCustomersRevenue.length === 0
    ) {
      throw new Error("No spending data found for the given campaign.");
    }

    // Ensure superCustomersRevenue and nonSuperCustomersRevenue are not empty arrays
    const totalRevenue =
      (superCustomersRevenue[0]?.total || 0) +
      (nonSuperCustomersRevenue[0]?.total || 0);

    // return the response
    const response = {
      totalRevenue,
      superCustomersRevenue: superCustomersRevenue[0]?.total || 0,
      nonSuperCustomersRevenue: nonSuperCustomersRevenue[0]?.total || 0,
    };

    return new NextResponse(JSON.stringify(response, null, 2), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
