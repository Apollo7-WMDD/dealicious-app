import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";

export const POST = async (request, { params }) => {
  const restaurantProfile = await request.json();
  const restaurantOwnerId = params.restaurantOwnerId;

  try {
    await connect();

    // post a new restaurant
    const newRestaurant = new Restaurant({
      userId: new mongoose.Types.ObjectId(restaurantOwnerId),
      name: restaurantProfile.name || "",
      category: restaurantProfile.category || "",
      manager: restaurantProfile.manager || "",
      email: restaurantProfile.email || "",
      address: restaurantProfile.address || "",
      phone: restaurantProfile.phone || "",
      website: restaurantProfile.website || "",
      businessHours: restaurantProfile.businessHours || "",
      superCustomerIdArray: [],
      superCustomerPoints: 0,
      menu: restaurantProfile.menu || "",
      logo: restaurantProfile.logo || "",
    });

    await newRestaurant.save();

    return new NextResponse(
      JSON.stringify({ message: "Restaurant posted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);
    return new NextResponse(JSON.stringify({ error: "Database Error" }), {
      status: 500,
    });
  }
};
