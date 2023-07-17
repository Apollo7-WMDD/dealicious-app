import { Schema, model, models } from "mongoose";

const DaySchema = new Schema({
  open: {
    type: String,
    required: [true, "Opening time is required."],
    validate: {
      validator: function (value) {
        const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; // 24-hour time format
        return timeRegex.test(value);
      },
      message: "Opening time format is invalid.",
    },
  },
  close: {
    type: String,
    required: [true, "Closing time is required."],
    validate: {
      validator: function (value) {
        const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; //24-hour time format
        return timeRegex.test(value);
      },
      message: "Closing time format is invalid.",
    },
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
});

const RestaurantSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
    index: true,
  },
  name: {
    type: String,
    unique: [true, "Name already exists"],
    required: [true, "Name is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  manager: {
    type: String,
    required: [true, "Manager is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
    validate: {
      validator: function (value) {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(value);
      },
      message: "Email format is invalid.",
    },
  },
  address: {
    street: String,
    postalCode: String,
    city: String,
    province: String,
    country: String,
  },
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
  website: {
    type: String,
    unique: [true, "Website already exists"],
    validate: {
      validator: function (value) {
        // Custom validation logic for website URL format
        const urlRegex =
          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/; // Example: URL format
        return urlRegex.test(value);
      },
      message: "Website URL format is invalid.",
    },
  },
  businessHours: {
    monday: DaySchema,
    tuesday: DaySchema,
    wednesday: DaySchema,
    thursday: DaySchema,
    friday: DaySchema,
    saturday: DaySchema,
    sunday: DaySchema,
    holiday: DaySchema,
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
    type: String,
    required: [true, "Menu is required"],
  },
  logo: {
    type: String,
    required: [true, "Logo is required"],
  },
  qrCode: {
    type: String,
    required: [true, "QR Code is required"], //validation pending
  },
});

const Restaurant = models.Restaurant || model("Restaurant", RestaurantSchema);

export default Restaurant;
