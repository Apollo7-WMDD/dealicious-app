import { Schema, model, models } from "mongoose";

const CampaignSchema = new Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: [true, "Restaurant ID is required"],
    index: true,
  },
  superCustomerIdArray: {
    type: [Schema.Types.ObjectId],
    ref: "SuperCustomerArray",
    default: [],
  },
  name: {
    type: String,
    unique: [true, "Name already exists"],
    required: [true, "Name is required"],
    trim: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  type: {
    type: [String],
    default: ["Type is required!"],
    validate: {
      validator: function (value) {
        return value.length > 0; // Ensure at least one type is provided
      },
      message: "At least one type is required!",
    },
  },
  offer: {
    type: String,
    default: "No offer",
    trim: true,
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
    required: [true, "Available Codes is required"],
    min: [1, "Available Codes must be at least 1"], // Minimum value allowed is 1
  },
  superCustomerPoints: {
    type: Number,
    default: 0,
  },
  state: {
    type: Boolean,
    default: true,
  },
  startDate: {
    type: Date,
    required: [true, "Start Date is required"],
    min: [new Date(), "Start Date must be a future date!"], // Start Date must be in the future
  },
  endDate: {
    type: Date,
    required: [true, "End Date is required!"],
    validate: {
      validator: function (value) {
        return value > this.startDate; // End Date must be greater than Start Date
      },
      message: "End Date must be after the Start Date",
    },
  },
  media: {
    type: [String],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  autoDescription: {
    type: String,
    default: "No auto description",
    trim: true,
  },
});

const Campaign = models.Campaign || model("Campaign", CampaignSchema);

export default Campaign;
