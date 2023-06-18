import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  const { email, password, firstname, lastname, phone } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await connect();

    const user = await mongoose.connection.db
      .collection("users")
      .findOne({ email });

    if (user) throw new Error("Email already exists! Try another one. Please");

    const userNew = await new User({
      email,
      password: hashedPassword,
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
