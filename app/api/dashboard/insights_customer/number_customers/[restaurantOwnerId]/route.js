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
          _id: "$isSuperCustomer",
          count: { $sum: 1 },
        },
      },
    ]).exec();

    const superCustomers = result.find((item) => item._id === true)?.count || 0;
    const nonSuperCustomers =
      result.find((item) => item._id === false)?.count || 0;

    return new NextResponse(
      JSON.stringify({
        superCustomers,
        nonSuperCustomers,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
