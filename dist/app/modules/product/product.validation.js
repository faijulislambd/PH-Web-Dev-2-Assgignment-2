"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    brand: zod_1.z.string().min(1, "Brand is required"),
    price: zod_1.z.number().min(0, "Price must be a positive number"),
    category: zod_1.z.enum([
        "Writing",
        "Office Supplies",
        "Art Supplies",
        "Educational",
        "Technology",
    ]),
    description: zod_1.z.string().min(1, "Description is required"),
    quantity: zod_1.z.number().int().min(0, "Quantity must be a positive integer"),
    inStock: zod_1.z.boolean(),
});
exports.default = productSchema;
