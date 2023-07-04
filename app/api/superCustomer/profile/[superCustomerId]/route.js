import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import SuperCustomer from "@/models/superCustomer";
import User from "@/models/user";

export const GET = async (request) => {
  const url = new URL(request.url);
  const superCustomerId = url.pathname.split("/")[4];

  try {
    await connect();

    // 1. Find the superCustomer by id
    const user = await User.findById(
      new mongoose.Types.ObjectId(superCustomerId)
    ).select({
      firstname: 1,
      lastname: 1,
      phone: 1,
    });

    // 2. If not found, return 404
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Return the combined result
    return new NextResponse(JSON.stringify({ user }), {
      status: 200,
    });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
