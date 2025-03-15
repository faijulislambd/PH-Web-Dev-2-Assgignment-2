import { z } from "zod";
import mongoose from "mongoose";

// Custom validation for MongoDB ObjectId
const objectIdSchema = z
  .string()
  .refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid product ID format",
  });

const orderSchema = z.object({
  email: z.string().email("Invalid email format"),
  product: objectIdSchema,
  quantity: z.number().int().positive("Quantity must be greater than zero"),
  totalPrice: z.number().positive("Total price must be greater than zero"),
});

export default orderSchema;
