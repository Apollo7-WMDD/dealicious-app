import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantId = url.pathname.split("/")[3];

  try {
    await connect();

    // 1. retrieve the restaurant id using the user id
    const restaurant = await Restaurant.findOne({
      _id: new mongoose.Types.ObjectId(restaurantId),
    }).select({
      name: 1,
      logo: 1,
      menu: 1,
      address: 1,
      phone: 1,
      website: 1,
    });

    if (!restaurant)
      return new NextResponse("Restaurant not found", { status: 200 });

    return new NextResponse(JSON.stringify({ restaurant }), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};

// export const POST = async (request) => {
//   const restaurantInfo = await request.json();
//   try {
//     const restaurant = await mongoose.connection.db
//       .collection("restaurants")
//       .findOne({ userId: restaurantInfo.userId });

//     if (restaurant) throw new Error("Restaurant already exists!");

//     const restaurantNew = await new Restaurant({
//       userId: restaurantInfo.userId,
//       name: restaurantInfo.name,
//       manager: restaurantInfo.manager,
//       email: restaurantInfo.email,
//       address: restaurantInfo.address,
//       phone: restaurantInfo.phone,
//       website: restaurantInfo.website,
//       businessHours: restaurantInfo.businessHours,
//       superCustomerIdArray: restaurantInfo.superCustomerIdArray,
//       superCustomerPoints: restaurantInfo.superCustomerPoints,
//       menu: restaurantInfo.menu,
//       logo: restaurantInfo.logo,
//     });

//     await restaurantNew.save();
//     return new NextResponse(JSON.stringify(restaurantNew), { status: 200 });
//   } catch (err) {
//     console.log(err.message);
//     return new NextResponse(err.message, { status: 500 });
//   }
// };
