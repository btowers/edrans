import { Router } from 'express';
import { cartC } from '../controllers/cartController';
import { validatorM } from '../middleware/validator';
import { authM } from '../middleware/auth';

const router = Router();

// Protected Routes
router.use(authM.isAuth);
router.get('/', cartC.getCart);
router.put('/add', validatorM.productToCart, cartC.addProductToCart);
router.post('/delete', validatorM.productToCart, cartC.deleteProductFromCart);
router.post('/submit', cartC.buyCart);

export default router;
