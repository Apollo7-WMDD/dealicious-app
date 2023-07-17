import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  firstname: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastname: {
    type: String,
    required: [true, "Last Name is required"],
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
});

const User = models.User || model("User", UserSchema);

export default User;
