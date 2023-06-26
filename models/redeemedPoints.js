import { Schema, model, models } from "mongoose";

const RedeemedPointsSchema = new Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: [true, "Restaurant ID is required"],
  },
  superCustomerId: {
    type: Schema.Types.ObjectId,
    ref: "SuperCustomer",
    required: [true, "Super Customer ID is required"],
  },
  points: {
    type: {
      type: Number,
      required: [true, "Points is required"],
      min: [0, "Points cannot be negative"],
    },
  },
  spendingBill: {
    type: Schema.Types.ObjectId,
    ref: "SpendingBill",
    required: [true, "Spending Bill ID is required"],
  },
});

const Redeemed = models.Redeemed || model("Redeemed", RedeemedPointsSchema);

export default Redeemed;
