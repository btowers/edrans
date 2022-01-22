import { Router } from "express";
import { orderC } from "../controllers/ordersController";
import { authM } from "../middleware/auth";

const router = Router();

// Protected Routes
router.use(authM.isAuth);
router.get("/:id?", orderC.getOrders);
router.post("/complete", orderC.completeOrder);

export default router;
