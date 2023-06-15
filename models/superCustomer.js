import { Schema, model, models } from "mongoose";

const SuperCustomerSchema = new Schema({
  birthDate: {
    type: Date,
    required: [true, "Birth Date is required!"],
  },
  phone: {
    type: Number,
    unique: [true, "Phone already exists!"],
    required: [true, "Phone is required!"],
  },
  restaurantIdArray: {
    type: [Schema.Types.ObjectId],
    ref: "RestaurantArray",
  },
  address: {
    type: String,
  },
  url: {
    type: String,
    required: [true, "URL is required!"],
  },
});

const SuperCustomer =
  models.SuperCustomer || model("SuperCustomer", SuperCustomerSchema);

export default SuperCustomer;
