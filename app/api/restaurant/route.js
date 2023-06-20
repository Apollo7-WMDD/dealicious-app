import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";

export const GET = async (request) => {
  try {
    await connect();
    // get the collection of movies without a Schema
    const restaurants = await mongoose.connection.db
      .collection("restaurants")
      .find({})
      .toArray();

    return new NextResponse(JSON.stringify(restaurants), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const restaurantInfo = await request.json();
  try {
    const restaurant = await mongoose.connection.db
      .collection("restaurants")
      .findOne({ userId: restaurantInfo.userId });

    if (restaurant) throw new Error("Restaurant already exists!");

    const restaurantNew = await new Restaurant({
      userId: restaurantInfo.userId,
      name: restaurantInfo.name,
      manager: restaurantInfo.manager,
      email: restaurantInfo.email,
      address: restaurantInfo.address,
      phone: restaurantInfo.phone,
      website: restaurantInfo.website,
      businessHours: restaurantInfo.businessHours,
      superCustomerIdArray: restaurantInfo.superCustomerIdArray,
      superCustomerPoints: restaurantInfo.superCustomerPoints,
      menu: restaurantInfo.menu,
      logo: restaurantInfo.logo,
    });

    await restaurantNew.save();
    return new NextResponse(JSON.stringify(restaurantNew), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};
