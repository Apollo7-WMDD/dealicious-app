import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";
import Campaign from "@/models/campaign";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantId = url.pathname.split("/")[3];
  const superCustomerId = url.pathname.split("/")[4];

  try {
    await connect();

    // check if the super Customer is inside an array of super Customer Ids in restaurant
    const isSuperCustomer = await Restaurant.findOne({
      _id: restaurantId,
      superCustomerIdArray: {
        $in: [new mongoose.Types.ObjectId(superCustomerId)],
      },
    }).lean();

    if (!isSuperCustomer) {
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    const [restaurant, campaigns] = await Promise.all([
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

      Campaign.find({ restaurantId, state: true })
        .select({
          name: 1,
          offer: 1,
          endDate: 1,
        })
        .lean(),
    ]);

    const result = {
      restaurant,
      campaigns,
    };

    return new NextResponse(JSON.stringify(result, null, 2), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse({ data: null }, { status: 200 });
  }
};
