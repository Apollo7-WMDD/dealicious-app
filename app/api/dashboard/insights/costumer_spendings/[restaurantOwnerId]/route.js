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

    // Find restaurantId from the restaurant collection
    const restaurant = await Restaurant.findOne(
      { userId: restaurantOwner },
      { _id: 1 }
    ).lean();

    const restaurantId = restaurant._id;

    // get the total revenue of super customers and non super customers from the spending collection using the billamount field
    const [superCustomersRevenue, nonSuperCustomersRevenue] = await Promise.all(
      [
        Spending.aggregate([
          {
            $match: { restaurantId: restaurantId, isSuperCustomer: true },
          },
          { $group: { _id: null, total: { $sum: "$billamount" } } },
        ]),
        Spending.aggregate([
          {
            $match: {
              restaurantId: restaurantId,
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
      superCustomersRevenue: superCustomersRevenue[0].total,
      nonSuperCustomersRevenue: nonSuperCustomersRevenue[0].total,
    };

    return new NextResponse(JSON.stringify(response, null, 2), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
