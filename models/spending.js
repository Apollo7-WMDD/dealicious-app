import { Schema, model, models } from "mongoose";

const SpendingSchema = new Schema({
  phone: {
    type: Number,
    unique: [true, "Phone already exists"],
    required: [true, "Phone is required"],
    validate: {
      validator: function (value) {
        // Custom validation logic for phone number format
        const phoneNumberRegex = /^[0-9]{10}$/; // Example: 10-digit phone number
        return phoneNumberRegex.test(value);
      },
      message: "Phone number should be a 10-digit number.",
    },
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: [true, "Restaurant ID is required"],
    index: true,
  },
  campaignId: {
    type: Schema.Types.ObjectId,
    ref: "Campaign",
    required: [true, "Campaign ID is required"],
  },
  billamount: {
    type: Number,
    required: [true, "Bill Amount is required"],
    min: [1, "Bill Amount cannot be negative and must be greater than 0"],
  },
  isSuperCustomer: {
    type: Boolean,
    default: false,
  },
  dateRedeemed: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  suggestion: {
    type: {
      foodQuality: {
        type: Boolean,
        default: false,
      },
      foodQuantity: {
        type: Boolean,
        default: false,
      },
      service: {
        type: Boolean,
        default: false,
      },
      place: {
        type: Boolean,
        default: false,
      },
      other: {
        type: Boolean,
        default: false,
      },
    },
    validate: {
      validator: function (value) {
        // Custom validation logic for suggestion
        const keys = Object.keys(value);
        return keys.some((key) => value[key]);
      },
      message: "At least one suggestion category should be selected",
    },
  },
});

const Spending = models.Spending || model("Spending", SpendingSchema);


export default Spending;
