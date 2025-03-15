import mongoose from "mongoose";
import { ProductModel } from "../product.model";
import { Product } from "./product.interface";

const createProductInDb = async (productData: Product) => {
  const product = new ProductModel(productData);
  const result = await product.save();
  return result;
};

const getAllProductsFromDb = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDb = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};

const updateProductInDb = async (
  id: string, // ID should be a string
  updatedProductData: Partial<Product>
) => {
  // Convert string ID to ObjectId
  const objectId = new mongoose.Types.ObjectId(id);
  const product = await ProductModel.findOne({ _id: objectId });
  if (!product) return;
  Object.keys(updatedProductData).forEach((key) => {
    if (
      updatedProductData[key as keyof Product] !== product[key as keyof Product]
    ) {
      product.set(key, updatedProductData[key as keyof Product]);
    }
  });

  const result = await product.save();
  return result;
};

const deleteSingleProductFromDb = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};

export const productServices = {
  createProductInDb,
  getAllProductsFromDb,
  getSingleProductFromDb,
  updateProductInDb,
  deleteSingleProductFromDb,
};
