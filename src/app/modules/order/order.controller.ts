import { Request, Response } from "express";
import { orderServices } from "./order.service";
import orderSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    // Validate date using zod
    const validatedData: any = orderSchema.safeParse(orderData);
    const result = await orderServices.createOrderInDb(validatedData.data);
    if (validatedData.error) {
      res.status(400).json({
        message: "Validation failed",
        success: false,
        data: validatedData.error,
      });
    }
    res.status(200).json({
      message: "Order created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Validation failed",
      success: false,
      data: error,
    });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getAllOrdersFromDb();
    res.status(200).json({
      message: "Orders are fetched successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Validation failed",
      success: false,
      data: error,
    });
  }
};

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.calculateRevenueFromOrderDb();

    res.status(200).json({
      message: "Revenue calculated successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Validation failed",
      success: false,
      data: error,
    });
  }
};

export const orderController = { createOrder, getAllOrders, calculateRevenue };
