import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Spending from "@/models/spending";
import Restaurant from "@/models/restaurant";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantOwner = url.pathname.split("/")[5];

  try {
    await connect();

    const restaurant = await Restaurant.findOne(
      { userId: restaurantOwner },
      { _id: 1 }
    ).lean();

    if (!restaurant) {
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    const restaurantId = restaurant._id;

    const result = await Spending.aggregate([
      {
        $match: {
          restaurantId: restaurantId,
        },
      },
      {
        $group: {
          _id: null,
          maxSpending: { $max: "$billamount" },
          minSpending: { $min: "$billamount" },
        },
      },
    ]).exec();

    const { maxSpending, minSpending } = result[0];

    const generateData = (range) => {
      const data = [];
      for (let i = 1; i <= range; i++) {
        data.push({
          x: i,
          y:
            Math.floor(Math.random() * (maxSpending - minSpending + 1)) +
            minSpending,
        });
      }
      return data;
    };

    const SC = {
      day: generateData(6),
      week: generateData(7),
      month: generateData(10),
    };

    const NC = {
      day: generateData(9),
      week: generateData(8),
      month: generateData(4),
    };

    return new NextResponse(
      JSON.stringify({
        SC: SC,
        NC: NC,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
