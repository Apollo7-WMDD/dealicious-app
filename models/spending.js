import { Schema, model, models } from "mongoose";

const SpendingSchema = new Schema({
  phone: {
    type: Number,
    unique: [true, "Phone already exists!"],
    required: [true, "Phone is required!"],
  },
  superCustomerId: {
    type: Schema.Types.ObjectId,
    ref: "SuperCustomer",
    required: [true, "Super Customer ID is required!"],
  },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: [true, "Restaurant ID is required!"],
  },
  campaignId: {
    type: Schema.Types.ObjectId,
    ref: "Campaign",
    required: [true, "Campaign ID is required!"],
  },
  billamount: {
    type: Number,
    required: [true, "Bill Amount is required!"],
  },
});

const Spending = models.Spending || model("Spending", SpendingSchema);

export default Spending;