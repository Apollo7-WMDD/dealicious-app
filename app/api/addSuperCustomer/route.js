import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import SuperCustomer from "@/models/superCustomer";

export const POST = async (request) => {
  const supercustomer = await request.json();

  try {
    await connect();
    const superCustomerNew = new SuperCustomer({
      firstname: supercustomer.firstname,
      lastname: supercustomer.lastname,
      birthDate: supercustomer.birthDate,
      phone: supercustomer.phone,
      restaurantIdArray: [
        new mongoose.Types.ObjectId(supercustomer.restaurantIdArray[0]),
        new mongoose.Types.ObjectId(supercustomer.restaurantIdArray[1]),
      ],
      url: supercustomer.url,
    });

    await superCustomerNew.save();
    return new NextResponse(JSON.stringify(superCustomerNew), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};
