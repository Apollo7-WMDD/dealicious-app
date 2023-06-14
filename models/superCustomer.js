import { Schema, model, models } from "mongoose";

const SuperCustomerSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required!"],
  },
  birthDate: {
    type: Date,
    required: [true, "Birth Date is required!"],
  },
  phone: {
    type: Number,
    unique: [true, "Phone already exists!"],
    required: [true, "Phone is required!"],
  },
  address: {
    type: String,
    required: [true, "Address is required!"],
  },
  url: {
    type: String,
    required: [true, "URL is required!"],
  },
});

const SuperCustomer =
  models.SuperCustomer || model("SuperCustomer", SuperCustomerSchema);

export default SuperCustomer;
