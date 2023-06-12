import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";

export const GET = async (request) => {

  try {
    await connect();
    // get the collection of movies without a Schema
    const users = await mongoose.connection.db.collection("users").find({}).toArray();

    return new NextResponse(JSON.stringify(users), { status: 200 });

  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};

