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
exports.productServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("../product.model");
const createProductInDb = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new product_model_1.ProductModel(productData);
    const result = yield product.save();
    return result;
});
const getAllProductsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find();
    return result;
});
const getSingleProductFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOne({ _id: id });
    return result;
});
const updateProductInDb = (id, // ID should be a string
updatedProductData) => __awaiter(void 0, void 0, void 0, function* () {
    // Convert string ID to ObjectId
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    const product = yield product_model_1.ProductModel.findOne({ _id: objectId });
    if (!product)
        return;
    Object.keys(updatedProductData).forEach((key) => {
        if (updatedProductData[key] !== product[key]) {
            product.set(key, updatedProductData[key]);
        }
    });
    const result = yield product.save();
    return result;
});
const deleteSingleProductFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.deleteOne({ _id: id });
    return result;
});
exports.productServices = {
    createProductInDb,
    getAllProductsFromDb,
    getSingleProductFromDb,
    updateProductInDb,
    deleteSingleProductFromDb,
};
