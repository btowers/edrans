import express from 'express'
import { productsC } from '../controllers/productsController'
import { userC } from '../controllers/userController'
const router = express.Router()

// Public Routes
router.get('/', productsC.getProducts)
router.get('/:id', productsC.getProduct)

// Protected Routes
router.use(userC.isAuth)
router.post('/', productsC.createProduct)
router.delete('/:id', productsC.deleteProduct)
router.put('/:id', productsC.updateProduct)

export default router
