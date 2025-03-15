import mongoose, { model, Schema } from "mongoose";
import { Order } from "./order/order.interface";

const orderSchema = new Schema<Order>({
  email: { type: String, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

export const OrderModel = model<Order>("Order", orderSchema);
