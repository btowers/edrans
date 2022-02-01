import { Router } from 'express'
import { imageC } from '../controllers/imageController'
import { userC } from '../controllers/userController'

const router = Router()

// Protected Routes
router.use(userC.isAuth)
router.post('/presignedurl', imageC.getPresignedUrl)
router.put('/', imageC.deleteImage)

export default router
