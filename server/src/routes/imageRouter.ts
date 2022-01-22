import { Router } from 'express';
import { imageM } from '../middleware/image';
import { imageC } from '../controllers/imageController';
import { validatorM } from '../middleware/validator';
import { authM } from '../middleware/auth';

const router = Router();

// Protected Routes
router.use(authM.isAuth);
router.post('/', imageM.uploadImage.single('image'), imageC.uploadImage);
router.delete('/', validatorM.body, imageC.deleteImage);

export default router;
