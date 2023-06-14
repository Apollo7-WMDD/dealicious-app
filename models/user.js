import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  name: {
    type: String,
    unique: [true, "Name already exists!"],
    required: [true, "Name is required!"],
  },
  phone: {
    type: Number,
    unique: [true, "Phone already exists!"],
    required: [true, "Phone is required!"],
  },
});

const User = models.User || model("User", UserSchema);

export default User;
