import { Router } from 'express'
import { cartC } from '../controllers/cartController'
import { authM } from '../middleware/auth'

const router = Router()

// Protected Routes
router.use(authM.isAuth)
router.get('/', cartC.getCart)
router.put('/add', cartC.addProductToCart)
router.post('/delete', cartC.deleteProductFromCart)
router.post('/submit', cartC.buyCart)

export default router
