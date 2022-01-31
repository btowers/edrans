import express from 'express'
import { userC } from '../controllers/userController'
import passport from '../services/authenticator'

const router = express.Router()

// Public Routes
router.post('/signup', userC.signup)
router.post('/login', userC.login)
router.get('/facebook', passport.authenticate('facebook', { session: false, scope: ['email'] }))
router.get('/facebook/redirect', userC.facebookLogin)

// Protected Routes
router.use(userC.isAuth)
router.get('/', userC.getUser)
router.put('/:id', userC.updateUser)

export default router
