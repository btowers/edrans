/* eslint-disable new-cap */
import { Router } from 'express'
import { errorHandler } from '../middleware/errors'
import productsRouter from './productsRouter'
import ordersRouter from './ordersRouter'
import cartRouter from './cartRouter'
import userRouter from './userRouter'
import imageRouter from './imageRouter'
import 'express-async-errors'

const router = Router()

router.use('/user', userRouter)
router.use('/products', productsRouter)
router.use('/orders', ordersRouter)
router.use('/cart', cartRouter)
router.use('/image', imageRouter)

router.use(errorHandler)

export default router
