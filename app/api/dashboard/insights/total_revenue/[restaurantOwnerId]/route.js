import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";
import Spending from "@/models/spending";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantOwner = url.pathname.split("/")[5];

  try {
    await connect();

    const restaurant = await Restaurant.findOne(
      { userId: restaurantOwner },
      { _id: 1 }
    );

    if (!restaurant) {
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    const restaurantId = restaurant._id;

    const pipeline = [
      {
        $match: {
          restaurantId,
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

    // create a fake data of object to show in the frontend for a line chart of 30 days
    const daily = Array.from({ length: 30 }, (_, i) => {
      return {
        daily: i + 1,
        totalRevenue: Math.floor(Math.random() * 1000) + 200,
      };
    });

    // create a fake data of object to show in the frontend for a line chart of 12 weeks
    const weekly = Array.from({ length: 12 }, (_, i) => {
      return {
        week: i + 1,
        totalRevenue: Math.floor(Math.random() * 1000) + 200,
      };
    });

    // create a fake data of object to show in the frontend for a line chart of 12 months
    const monthly = Array.from({ length: 12 }, (_, i) => {
      return {
        month: i + 1,
        totalRevenue: Math.floor(Math.random() * 1000) + 200,
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
