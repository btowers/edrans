import { Router } from 'express';
import { orderC } from '../controllers/ordersController';
import { authM } from '../middleware/auth';
import { validatorM } from '../middleware/validator';

const router = Router();

// Protected Routes
router.use(authM.isAuth);
router.get('/:id?', validatorM.params, orderC.getOrders);
router.post('/complete', validatorM.orderId, orderC.completeOrder);

export default router;
