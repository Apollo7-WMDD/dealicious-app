import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Points from "@/models/points";

export const GET = async (request) => {
  try {
    await connect();
    // get the collection of movies without a Schema
    const customerPoints = await mongoose.connection.db
      .collection("points")
      .find({})
      .toArray();

    return new NextResponse(JSON.stringify(customerPoints), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const superCustomerPoints = await request.json();

  try {
    const customerPoints = await mongoose.connection.db
      .collection("points")
      .findOne({ superCustomerId: superCustomerPoints.superCustomerId });

    if (customerPoints) throw new Error("Customer Points already exists!");

    const customerPointsNew = await new Points({
      restaurantId: superCustomerPoints.restaurantId,
      superCustomerId: superCustomerPoints.superCustomerId,
      points: superCustomerPoints.points,
    });

    await userNew.save();
    return new NextResponse(JSON.stringify(customerPointsNew), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};
