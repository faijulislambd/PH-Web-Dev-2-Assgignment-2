"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
// Custom validation for MongoDB ObjectId
const objectIdSchema = zod_1.z
    .string()
    .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), {
    message: "Invalid product ID format",
});
const orderSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    product: objectIdSchema,
    quantity: zod_1.z.number().int().positive("Quantity must be greater than zero"),
    totalPrice: zod_1.z.number().positive("Total price must be greater than zero"),
});
exports.default = orderSchema;
