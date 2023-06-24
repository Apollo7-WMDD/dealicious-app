import { Schema, model, models } from "mongoose";

const PointsSchema = new Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: [true, "Restaurant ID is required!"],
  },
  superCustomerId: {
    type: Schema.Types.ObjectId,
    ref: "SuperCustomer",
    required: [true, "Super Customer ID is required!"],
  },
  points: {
    type: Number,
  },
});

const Points = models.Points || model("Points", PointsSchema);

export default Points;
