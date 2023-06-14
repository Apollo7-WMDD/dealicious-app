import { Schema, model, models } from "mongoose";

const RestaurantSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required!"],
  },
  name: {
    type: String,
    unique: [true, "Name already exists!"],
    required: [true, "Name is required!"],
  },
  manager: {
    type: String,
    required: [true, "Manager is required!"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  address: {
    type: Map,
    required: [true, "Address is required!"],
  },
  phone: {
    type: Number,
    unique: [true, "Phone already exists!"],
    required: [true, "Phone is required!"],
  },
  website: {
    type: String,
    unique: [true, "Website already exists!"],
  },
  businessHours: {
    type: Map,
    of: String,
  },
  superCustomerIdArray: {
    type: [Schema.Types.ObjectId],
    ref: "SuperCustomerArray",
  },
  superCustomerPoints: {
    type: Number,
    default: 0,
  },
  menu: {
    type: Map,
    of: String,
  },
  logo: {
    type: String,
  },
});

const Restaurant = models.Restaurant || model("Restaurant", RestaurantSchema);

export default Restaurant;
