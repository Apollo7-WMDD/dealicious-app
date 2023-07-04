import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";
import Campaign from "@/models/campaign";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantId = url.pathname.split("/")[3];

  try {
    await connect();

    const promises = [
      Restaurant.findOne({
        _id: restaurantId,
      })
        .select({
          name: 1,
          _id: 1,
          logo: 1,
          address: 1,
          website: 1,
          menu: 1,
          phone: 1,
        })
        .lean(),

      Campaign.find({
        restaurantId,
        state: true,
      })
        .select({
          name: 1,
          offer: 1,
          endDate: 1,
        })
        .lean(),
    ];

    const [restaurant, campaigns] = await Promise.all(promises);

    const result = { restaurant, campaigns };

    return new NextResponse(JSON.stringify(result), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
