import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  firstname: {
    type: String,
    required: [true, "First name is required!"],
  },
  lastname: {
    type: String,
    required: [true, "Last name is required!"],
  },
  phone: {
    type: Number,
    unique: [true, "Phone already exists!"],
    required: [true, "Phone is required!"],
  },
});

const User = models.User || model("User", UserSchema);

export default User;
