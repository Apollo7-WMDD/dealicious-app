import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";
import Spending from "@/models/spending";

export const GET = async (request) => {
  const url = new URL(request.url);
  const campaignId = url.pathname.split("/")[5];

  try {
    await connect();

    const pipeline = [
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
    ];

    const [result] = await Spending.aggregate(pipeline).allowDiskUse(true);

    const daily = Array.from({ length: 30 }, (_, i) => {
      return {
        daily: i + 1,
        totalRevenue: Math.floor(Math.random() * 300),
      };
    });

    const weekly = Array.from({ length: 12 }, (_, i) => {
      return {
        week: i + 1,
        totalRevenue: Math.floor(Math.random() * 300),
      };
    });

    const monthly = Array.from({ length: 12 }, (_, i) => {
      return {
        month: i + 1,
        totalRevenue: Math.floor(Math.random() * 300),
      };
    });

    const response = {
      totalRevenue: result ? result.totalRevenue : 0,
      daily,
      weekly,
      monthly,
    };

    return new NextResponse(JSON.stringify(response, null, 2), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
