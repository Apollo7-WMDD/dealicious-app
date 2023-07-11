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

    const [customers, superCustomers] = await Promise.all([
      Spending.countDocuments({
        campaignId: new mongoose.Types.ObjectId(campaignId),
      }),
      Spending.countDocuments({
        campaignId: new mongoose.Types.ObjectId(campaignId),
        isSuperCustomer: true,
      }),
    ]);

    const response = {
      totalCustomers: customers,
      totalSuperCustomers: superCustomers,
      totalNonSuperCustomers: customers - superCustomers,
    };

    return new NextResponse(JSON.stringify(response, null, 2), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
