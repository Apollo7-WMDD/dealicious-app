import { Schema, model, models } from "mongoose";

const SuperCustomerSchema = new Schema({
  birthDate: {
    type: Date,
    required: [true, "Birth Date is required"],
  },
  phone: {
    type: Number,
    unique: [true, "Phone already exists!"],
    required: [true, "Phone is required!"],
    validate: {
      validator: function (value) {
        // Custom validation logic for phone number format
        const phoneNumberRegex = /^[0-9]{10}$/; // Example: 10-digit phone number
        return phoneNumberRegex.test(value);
      },
      message: "Phone number should be a 10-digit number.",
    },
  },
  restaurantIdArray: {
    type: [Schema.Types.ObjectId],
    ref: "RestaurantArray",
  },
  url: {
    type: String,
    required: [true, "URL is required"],
  },
});

const SuperCustomer =
  models.SuperCustomer || model("SuperCustomer", SuperCustomerSchema);

export default SuperCustomer;
