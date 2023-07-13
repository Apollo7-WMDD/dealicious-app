import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";
import Campaign from "@/models/campaign";

export const GET = async (request) => {
  const url = new URL(request.url);
  const superCustomerId = url.pathname.split("/")[5];

  try {
    await connect();

    const restaurantInfo = await Restaurant.findOne({
      superCustomerIdArray: { $in: [superCustomerId] },
    })
      .select({
        name: 1,
        address: 1,
        email: 1,
        website: 1,
        category: 1,
        phone: 1,
        menu: 1,
        logo: 1,
      })
      .lean();

    if (!restaurantInfo) {
      // Return empty response if no restaurant info is found
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    // Construct the response object with restaurant information and restaurant ID
    const response = {
      restaurantInfo,
      superCustomerId: superCustomerId,
    };

    // Return the response as JSON
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(JSON.stringify({ error: "Database Error" }), {
      status: 500,
    });
  }
};
