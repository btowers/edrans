import { Router } from 'express'
import { orderC } from '../controllers/ordersController'
import { userC } from '../controllers/userController'

const router = Router()

// Protected Routes
router.use(userC.isAuth)
router.get('/:id?', orderC.getOrders)
router.post('/complete', orderC.completeOrder)

export default router
