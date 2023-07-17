import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";
import Campaign from "@/models/campaign";
import User from "@/models/user";

export const GET = async (request) => {
  const url = new URL(request.url);
  // console.log(url)
  const restaurantId = url.pathname.split("/")[5];
  const superCustomerId = url.pathname.split("/")[4];

  try {
    await connect();

    const promises = [
      Restaurant.findOne({ _id: restaurantId })
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

      Campaign.find({ restaurantId, status: "active" }) // Filter by active campaigns
        .select({
          name: 1,
          offer: 1,
          startDate:1,
          endDate: 1,
          media:1,
          description:1,
        })
        .lean(),

        User.findOne({ _id: superCustomerId })
        .select({
          firstname: 1,
          lastname:1,
        })
        .lean(),
    ];

    const [restaurant, campaigns, user] = await Promise.all(promises);

    const result = {
      restaurant,
      campaigns,
      user
    };

    return new NextResponse(JSON.stringify(result, null, 2), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
