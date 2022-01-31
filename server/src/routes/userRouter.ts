import express from 'express'
import { userC } from '../controllers/userController'
import passport from '../services/authenticator'

const router = express.Router()

// Public Routes
router.post('/signup', userC.signup)
router.post('/login', userC.login)
router.get('/facebook', userC.facebookLogin)
router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
  }),
  function (req, res) {
    console.log(req.user)
    res.cookie('token', 'holaaaa').redirect('/')
  }
)

export default router
