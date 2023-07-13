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
  spendingBillId: {
    type: Schema.Types.ObjectId,
    ref: "spendingBillId",
    required: [true, "Spending Bill ID is required"],
  },
  points: {
    type: Number,
    required: [true, "Points is required"],
    min: [0, "Points must be greater than 0"],
  },
});

const Redeemed = models.Redeemed || model("Redeemed", RedeemedPointsSchema);

export default Redeemed;
