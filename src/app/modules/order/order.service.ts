import mongoose from "mongoose";
import { OrderModel } from "../order.model";
import { Order } from "./order.interface";

const createOrderInDb = async (orderData: Order) => {
  const order = new OrderModel(orderData);
  const result = await order.save();
  return result;
};
const getAllOrdersFromDb = async () => {
  const result = await OrderModel.find();
  return result;
};

const getSingleOrderFromDb = async (id: mongoose.Schema.Types.ObjectId) => {
  const result = await OrderModel.findOne({ id });
  return result;
};

const calculateRevenueFromOrderDb = async () => {
  const result = await OrderModel.aggregate([
    //Stage one getting the number of items ordered and the total price
    {
      $group: {
        _id: null,
        totalProductCount: { $sum: "$quantity" },
        totalPrice: { $sum: "$totalPrice" },
      },
    },

    //Stage two projecting the revenue
    {
      $project: {
        _id: 0,
        totalRevenue: { $multiply: ["$totalProductCount", "$totalPrice"] },
      },
    },
  ]);
  return result;
};

export const orderServices = {
  createOrderInDb,
  getAllOrdersFromDb,
  getSingleOrderFromDb,
  calculateRevenueFromOrderDb,
};
