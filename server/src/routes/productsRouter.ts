import express from "express";
import { productsC } from "../controllers/productsController";
import { authM } from "../middleware/auth";
const router = express.Router();

// Public Routes
router.get("/:category?", productsC.getProducts);

// Protected Routes
router.use(authM.isAuth);
router.post("/", productsC.createProduct);
router.delete("/:id", productsC.deleteProduct);
router.put("/:id", productsC.updateProduct);

export default router;
