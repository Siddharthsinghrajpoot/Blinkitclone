import userAuth from "../middleware/userauth.js";
import express from "express";
import User from "../models/userModel.js";
const router = express.Router();
router.get("/hello", (req, res) => {
  res.send("hello world");
});
// ADD TO CART ONLY

router.post("/add", userAuth, async (req, res) => {
  try {
    const { productId } = req.body;

    
    const user = await User.findById(req.user._id);

    const itemIndex = user.cart.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += 1;
    } else {
      user.cart.push({ product: productId, quantity: 1 });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart: user.cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Add to cart failed" });
  }
});


export default router;