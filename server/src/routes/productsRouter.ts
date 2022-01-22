import express from 'express';
import { validatorM } from '../middleware/validator';
import { productsC } from '../controllers/productsController';
import { authM } from '../middleware/auth';
const router = express.Router();

// Public Routes
router.get('/:category?', validatorM.params, productsC.getProducts);

// Protected Routes
router.use(authM.isAuth);
router.post('/', validatorM.newProduct, productsC.createProduct);
router.delete('/:id', validatorM.params, productsC.deleteProduct);
router.put(
  '/:id',
  validatorM.params,
  validatorM.updateProduct,
  productsC.updateProduct
);

export default router;
