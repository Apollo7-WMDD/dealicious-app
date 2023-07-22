import { Schema, model, models } from "mongoose";

const PhoneAuthSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
});

const PhoneAuth =
  models.PhoneAuth || model("PhoneAuth", PhoneAuthSchema, "phoneauths");

export default PhoneAuth;