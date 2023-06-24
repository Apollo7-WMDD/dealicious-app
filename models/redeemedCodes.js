import { Schema, model, models } from "mongoose";

const RedeemedCodes = new Schema({
  phone: {
    type: Number,
    required: [true, "Phone is required!"],
  },
  campaignId: {
    type: Schema.Types.ObjectId,
    ref: "Campaign",
    required: [true, "Campaign ID is required!"],
  },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: [true, "Restaurant ID is required!"],
  },
  bill: {
    type: Number,
    required: [true, "Bill is required!"],
  },
  superCustomerCode: {
    type: Boolean,
    default: false,
  },
});

const RedeemedCode =
  models.RedeemedCode || model("RedeemedCode", RedeemedCodes);

export default RedeemedCode;
