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
    const restaurantId = await Restaurant.findOne(
      { userId: restaurantOwner },
      { _id: 1 }
    ).lean();

    const [customers, superCustomers] = await Promise.all([
      Spending.countDocuments({ restaurantId: restaurantId }),
      Spending.countDocuments({
        restaurantId: restaurantId,
        isSuperCustomer: true,
      }),
    ]);

    const response = {
      totalCustomers: customers,
      totalSuperCustomers: superCustomers,
      totalNonSuperCustomers: customers - superCustomers,
    };

    return new NextResponse(JSON.stringify(response, null, 2), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};

// import { NextResponse } from "next/server";
// import connect from "@/utils/database";
// import mongoose from "mongoose";
// import Restaurant from "@/models/restaurant";
// import Campaign from "@/models/campaign";
// import Spending from "@/models/spending";

// export const GET = async (request) => {
//   const url = new URL(request.url);
//   const restaurantOwner = url.pathname.split("/")[5];

//   try {
//     await connect();

//     // Find restaurantId from the restaurant collection
//     const restaurant = await Restaurant.findOne(
//       { userId: restaurantOwner },
//       { _id: 1 }
//     ).lean();

//     if (!restaurant) {
//       // Return empty response if no restaurant info is found
//       return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
//     }

//     // Find campaigns for the restaurant
//     const campaigns = await Campaign.aggregate([
//       { $match: { restaurantId: restaurant._id } },
//       {
//         $lookup: {
//           from: "spendings",
//           localField: "_id",
//           foreignField: "campaignId",
//           as: "spendings",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//           startDate: 1,
//           endDate: 1,
//           allowSC: 1,
//           allowNC: 1,
//           offer: 1,
//           totalBillAmount: { $sum: "$spendings.billamount" },
//           count: { $size: "$spendings" },
//         },
//       },
//     ]);

//     // Construct the response object
//     const response = {
//       restaurantId: restaurant._id,
//       campaigns,
//     };

//     // Return the nicely formatted JSON object
//     return new NextResponse(JSON.stringify(response, null, 2), { status: 200 });
//   } catch (err) {
//     console.log(err.message);
//     return new NextResponse("Database Error", { status: 500 });
//   }
// };
