import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrder extends Document {
  courseIds: string[]; // Updated to hold multiple course IDs
  userId: string;
  payment_info: object;
}

const orderSchema = new Schema<IOrder>(
  {
    courseIds: {
      type: [String], // Array of strings to hold multiple course IDs
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    payment_info: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel: Model<IOrder> = mongoose.model("Order", orderSchema);
export default OrderModel;
