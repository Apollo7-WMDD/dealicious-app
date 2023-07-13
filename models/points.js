import { Schema, model, models } from "mongoose";

const PointsSchema = new Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: [true, "Restaurant ID is required"],
  },
  superCustomerId: {
    type: Schema.Types.ObjectId,
    ref: "SuperCustomer",
    required: [true, "Super Customer ID is required"],
  },
  points: {
    type: Number,
    required: [true, "Points is required"],
    min: [0, "Points must be greater than 0"],
  },
});

const Point = models.Point || model("Point", PointsSchema);

export default Point;
