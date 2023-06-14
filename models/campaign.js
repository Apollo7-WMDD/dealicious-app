import { Schema, model, models } from "mongoose";

const CampaignSchema = new Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: [true, "Restaurant ID is required!"],
  },
  superCustomerIdArray: {
    type: [Schema.Types.ObjectId],
    ref: "SuperCustomerArray",
  },
  name: {
    type: String,
    unique: [true, "Name already exists!"],
    required: [true, "Name is required!"],
  },
  campaginStatus: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  type: {
    type: Array,
    of: String,
    required: [true, "Type is required!"],
  },
  offer: {
    type: String,
    required: [true, "Offer is required!"],
  },
  allowSuperCustomer: {
    type: Boolean,
    default: false,
  },
  allowNewCustomer: {
    type: Boolean,
    default: false,
  },
  expiredByNumber: {
    type: Boolean,
    default: false,
  },
  availableCodes: {
    type: Number,
    required: [true, "Available Codes is required!"],
  },
  superCustomerPoints: {
    type: Number,
    default: 0,
  },
  startDate: {
    type: Date,
    required: [true, "Start Date is required!"],
  },
  endDate: {
    type: Date,
    required: [true, "End Date is required!"],
  },
  media: {
    type: Array,
    of: String,
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Campaign = models.Campaign || model("Campaign", CampaignSchema);

export default Campaign;