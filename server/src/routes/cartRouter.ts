import { Router } from 'express'
import { cartC } from '../controllers/cartController'
import { userC } from '../controllers/userController'

const router = Router()

// Protected Routes
router.use(userC.isAuth)
router.get('/', cartC.getCart)
router.put('/add', cartC.addProductToCart)
router.post('/delete', cartC.deleteProductFromCart)
router.get('/submit', cartC.buyCart)

export default router
