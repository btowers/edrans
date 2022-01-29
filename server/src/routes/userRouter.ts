import express from 'express'
import { userC } from '../controllers/userController'

const router = express.Router()

// Public Routes
router.post('/signup', userC.signup)
router.post('/login', userC.login)
router.post('/google', userC.googleLogin)

export default router
