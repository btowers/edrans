import { Router } from "express";
import { imageM } from "../middleware/image";
import { imageC } from "../controllers/imageController";
import { authM } from "../middleware/auth";

const router = Router();

// Protected Routes
router.use(authM.isAuth);
router.post("/", imageM.uploadImage.single("image"), imageC.uploadImage);
router.delete("/", imageC.deleteImage);

export default router;
