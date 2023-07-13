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

    // and then calculate the total revenue of all customers
    const totalRevenue =
      superCustomersRevenue[0].total + nonSuperCustomersRevenue[0].total;

    // return the response
    const response = {
      totalRevenue,
      superCustomersRevenue: superCustomersRevenue[0]?.total,
      nonSuperCustomersRevenue: nonSuperCustomersRevenue[0]?.total,
    };

    return new NextResponse(JSON.stringify(response, null, 2), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
