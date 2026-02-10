import express from "express"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
dotenv.config();
const app=express();
const PORT=5000;
app.use(express.json());

app.use("/api/users",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error("Failed to connect to DB", err);
});