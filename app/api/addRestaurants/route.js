import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import Restaurant from "@/models/restaurant";

export const POST = async (request) => {
  const restaurant = await request.json();

  try {
    await connect();

    const restaurantNew = await new Restaurant({
      userId: new mongoose.Types.ObjectId(restaurant.userId),
      name: restaurant.name,
      manager: restaurant.manager,
      email: restaurant.email,
      address: {
        street: restaurant.address.street,
        postalCode: restaurant.address.postalCode,
        city: restaurant.address.city,
        province: restaurant.address.province,
        country: restaurant.address.country,
      },
      phone: restaurant.phone,
      website: restaurant.website,
      businessHours: {
        monday: {
          open: restaurant.businessHours.monday.open,
          close: restaurant.businessHours.monday.close,
        },
        tuesday: {
          open: restaurant.businessHours.tuesday.open,
          close: restaurant.businessHours.tuesday.close,
        },
        wednesday: {
          open: restaurant.businessHours.wednesday.open,
          close: restaurant.businessHours.wednesday.close,
        },
        thursday: {
          open: restaurant.businessHours.thursday.open,
          close: restaurant.businessHours.thursday.close,
        },
        friday: {
          open: restaurant.businessHours.friday.open,
          close: restaurant.businessHours.friday.close,
        },
        saturday: {
          open: restaurant.businessHours.saturday.open,
          close: restaurant.businessHours.saturday.close,
        },
        sunday: {
          open: restaurant.businessHours.sunday.open,
          close: restaurant.businessHours.sunday.close,
        },
      },
      superCustomerIdArray: [
        new mongoose.Types.ObjectId(restaurant.superCustomerIdArray[0]),
        new mongoose.Types.ObjectId(restaurant.superCustomerIdArray[1]),
      ],
      superCustomerPoints: restaurant.superCustomerPoints,
      menu: restaurant.menu,
      logo: restaurant.logo,
      qrCode: restaurant.qrCode,
    });

    await restaurantNew.save();
    return new NextResponse(JSON.stringify(restaurantNew), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};
