import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import User from "@/models/user";

export const GET = async (request) => {
  try {
    await connect();
    // get the collection of movies without a Schema
    const users = await mongoose.connection.db
      .collection("users")
      .find({})
      .toArray();

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const { email, firstname, lastname, phone } = await request.json();

  try {
    const user = await mongoose.connection.db
      .collection("users")
      .findOne({ email });

    if (user) throw new Error("Email already exists! Try another one. Please");

    const userNew = await new User({
      email,
      firstname,
      lastname,
      phone,
    });

    await userNew.save();
    return new NextResponse(JSON.stringify(userNew), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};
