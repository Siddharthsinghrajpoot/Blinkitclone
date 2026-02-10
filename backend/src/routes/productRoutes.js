import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

router.get("/hello", (req, res) => {
  res.send("hello world");
});

//  GET ALL PRODUCTS (PUBLIC)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
});

// GET SINGLE PRODUCT BY ID (PUBLIC)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Invalid product ID",
    });
  }
});

//  CREATE PRODUCT (TEMP – ADMIN / TEST)
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      subCategory,
      sizes,
      bestseller,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Product creation failed",
    });
  }
});


export default router;
