import express from 'express'
import { userC } from '../controllers/userController'

const router = express.Router()

// Public Routes
router.post('/signup', userC.signup)
router.post('/login', userC.login)

export default router
