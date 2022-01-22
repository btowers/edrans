/* eslint-disable new-cap */
import { Router } from 'express';
import { ErrorsM } from '../middleware/errors';
import { validatorM } from '../middleware/validator';
import productsRouter from './productsRouter';
import ordersRouter from './ordersRouter';
import cartRouter from './cartRouter';
import userRouter from './userRouter';
import imageRouter from './imageRouter';
import 'express-async-errors';


const router = Router();

// Validate Query Params if any for all routes
router.use(validatorM.query);

router.use('/user', userRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);
router.use('/cart', cartRouter);
router.use('/image', imageRouter);


router.use(ErrorsM.errors);

export default router;
