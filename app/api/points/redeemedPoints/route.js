import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Redeemed from "@/models/redeemedPoints";

export const GET = async (request) => {
  try {
    await connect();
    // get the collection of movies without a Schema
    const redeemedPoints = await mongoose.connection.db
      .collection("redeemedPoints")
      .find({})
      .toArray();

    return new NextResponse(JSON.stringify(redeemedPoints), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const redeemedPointsCustomer = await request.json();

  try {
    const redeemedPoints = await mongoose.connection.db
      .collection("redeemedPoints")
      .findOne({ superCustomerId: superCustomerPoints.superCustomerId });

    if (redeemedPoints)
      throw new Error("Redeemed Points per Customer already exists!");

    const redeemedPointsNew = await new Redeemed({
      restaurantId: redeemedPointsCustomer.restaurantId,
      superCustomerId: redeemedPointsCustomer.superCustomerId,
      points: redeemedPointsCustomer.points,
    });

    await userNew.save();
    return new NextResponse(JSON.stringify(redeemedPointsNew), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};
