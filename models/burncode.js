import { Schema, model, models } from "mongoose";

const BurnCodeSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  campaignname: {
    type: String,
    required: true,
  },
  offer: {
    type: String,
    required: true,
  },
  burned: {
    type: Boolean,
    required: true,
    default: false,
  },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  campaignId: {
    type: Schema.Types.ObjectId,
    ref: "Campaign",
  }
});

const Burncode = models.Burncode || model("Burncode", BurnCodeSchema);

export default Burncode;
