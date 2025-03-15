import { Request, Response } from "express";
import { productServices } from "./product.service";
import productSchema from "./product.validation";
import { Product } from "./product.interface";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    // Validate date using zod
    const validatedData = productSchema.parse(productData);

    const result = await productServices.createProductInDb(validatedData);
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
  } catch (error) {
    res.status(500).json({
      message: "Validation failed",
      success: false,
      data: error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProductsFromDb();
    res.status(200).json({
      message: "Products are fetched successfully",
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

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductFromDb(productId);

    res.status(200).json({
      message: "Product fetched successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      message: "Product Not Found",
      success: false,
      data: error,
    });
  }
};

const updateProduct = async (
  req: Request<{ productId: string }, {}, Partial<Product>>,
  res: Response
) => {
  try {
    const { productId } = req.params;

    const updatedData = req.body;

    const result = await productServices.updateProductInDb(
      productId,
      updatedData
    );

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
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      success: false,
      error: error instanceof Error ? error.message : error,
    });
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteSingleProductFromDb(productId);
    res.status(200).json({
      message: "Product deleted successfully",
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

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteSingleProduct,
};
