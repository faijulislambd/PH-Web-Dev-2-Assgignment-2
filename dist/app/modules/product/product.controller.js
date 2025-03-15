"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product: productData } = req.body;
        // Validate date using zod
        const validatedData = product_validation_1.default.parse(productData);
        const result = yield product_service_1.productServices.createProductInDb(validatedData);
        if (result.errors) {
            res.status(400).json({
                message: "Validation failed",
                success: false,
                data: result.errors,
            });
        }
        res.status(200).json({
            message: "Product created successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            data: error,
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productServices.getAllProductsFromDb();
        res.status(200).json({
            message: "Products are fetched successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            data: error,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productServices.getSingleProductFromDb(productId);
        res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Product Not Found",
            success: false,
            data: error,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updatedData = req.body;
        const result = yield product_service_1.productServices.updateProductInDb(productId, updatedData);
        // If no product found, return 404
        if (!result) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Product updated successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "An error occurred",
            success: false,
            error: error instanceof Error ? error.message : error,
        });
    }
});
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productServices.deleteSingleProductFromDb(productId);
        res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            data: error,
        });
    }
});
exports.productController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteSingleProduct,
};
