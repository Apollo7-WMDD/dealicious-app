import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Spending from "@/models/spending";
import SuperCustomer from "@/models/superCustomer";
import Point from "@/models/points";
import Redeemed from "@/models/redeemedPoints";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantId = url.pathname.split("/")[5];

  try {
    await connect();

    const promises = [
      // 1. total revenue for the campaign sum of billamount
      Spending.aggregate([
        {
          $match: {
            restaurantId: new mongoose.Types.ObjectId(restaurantId),
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$billamount" },
          },
        },
      ]),

      // 2. super customer birthdate only using the restaurantId that must match inside the array property restaurantIdArray of the superCustomer model
      SuperCustomer.aggregate([
        {
          $match: {
            restaurantIdArray: new mongoose.Types.ObjectId(restaurantId),
          },
        },
        {
          $project: {
            _id: 0,
            birthDate: 1,
          },
        },
      ]),

      // 3. number of Super Customers and Non Super Customers based on the property isSuperCustomer
      Spending.aggregate([
        {
          $match: {
            restaurantId: new mongoose.Types.ObjectId(restaurantId),
          },
        },
        {
          $group: {
            _id: "$isSuperCustomer",
            count: { $sum: 1 },
          },
        },
      ]),

      // 4. top 10 super customers with the highest billamount spent using the spending collection
      Spending.aggregate([
        {
          $match: {
            restaurantId: new mongoose.Types.ObjectId(restaurantId),
            isSuperCustomer: true,
          },
        },
        {
          $group: {
            _id: "$name",
          },
        },
        {
          $sort: {
            totalBillAmount: -1,
          },
        },
        {
          $limit: 10,
        },
      ]),

      // 5. total of points earned by users, total points redeemed earned by users using the points and redeemeds collection
      Point.aggregate([
        {
          $match: {
            restaurantId: new mongoose.Types.ObjectId(restaurantId),
          },
        },
        {
          $group: {
            _id: null,
            totalPoints: { $sum: "$points" },
          },
        },
      ]),
      Redeemed.aggregate([
        {
          $match: {
            restaurantId: new mongoose.Types.ObjectId(restaurantId),
          },
        },
        {
          $group: {
            _id: null,
            totalRedeemedPoints: { $sum: "$points" },
          },
        },
      ]),
    ];

    const results = await Promise.all(promises);

    const costumerData = {
      totalRevenue: results[0][0]?.totalRevenue || 0,
      superCustomerBirthdate: results[1] || [],
      numberCustomer: {
        superCustomerCount: 0,
        newCustomerCount: 0,
      },
      top10SuperCustomers: results[3]?.map((result) => result._id) || [],
      totalPoints: {
        EarnedPoints: results[4][0]?.totalPoints || 0,
        RedeemedPoints: results[5][0]?.totalRedeemedPoints || 0,
      },
    };

    for (const result of results[2]) {
      if (result._id === true) {
        costumerData.numberCustomer.superCustomerCount = result.count;
      } else {
        costumerData.numberCustomer.newCustomerCount = result.count;
      }
    }

    return new NextResponse(JSON.stringify(costumerData), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(JSON.stringify({}), { status: 200 });
  }
};
