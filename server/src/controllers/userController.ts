import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import {
  UpdateUserI,
  UserI,
  UserIdJoiSchema,
  UserUpdateJoiSchema,
} from '../interfaces/userInterface'
import { userS } from '../api/userService'
import { generateJWT } from '../utils/generateJWT'
import 'express-async-errors'

class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user as UserI
    const user = await userS.getUserById(id)
    if (!user) throw new Error('user not found')
    res.status(200).json({ data: user })
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const userFields = req.body as UpdateUserI
    if (Object.keys(userFields).length == 0) throw new Error('missing fields to update')
    await UserIdJoiSchema.validateAsync(id)
    await UserUpdateJoiSchema.validateAsync(userFields)
    const updatedUser = await userS.updateUser(id, userFields)
    if (!updatedUser) throw new Error('user not found')
    res.status(200).json({ data: updatedUser })
  }

  async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('login', { session: false }, async (err, user, info) => {
      if (err) next(new Error('usuario/contraseña incorrectos'))
      else {
        if (!user) next(new Error('missing credentials'))
        else {
          const token = await generateJWT(user)
          if (!token) return new Error('missing token')
          else res.cookie('token', token).json({ token })
        }
      }
    })(req, res, next)
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('signup', { session: false }, function (err, user, info) {
      if (err) next(new Error(err.message))
      else {
        if (!user) next(new Error(info.message))
        else res.status(201).json({ data: user })
      }
    })(req, res, next)
  }

  async facebookLogin(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      'facebook',
      { session: false, scope: ['email'] },
      async function (err, user, info) {
        if (err) next(new Error(err.message))
        else {
          if (!user) next(new Error(info.message))
          else {
            const token = await generateJWT(user)
            if (!token) next(new Error('missing token'))
            else res.cookie('token', token).redirect('/')
          }
        }
      }
    )(req, res, next)
  }

  async isAuth(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
      const protectedAdminRoutes: string[] = ['/api/products']
      if (err) next(new Error(err.message))
      else {
        if (!user) next(new Error(info.message))
        else if ((protectedAdminRoutes.includes(req.baseUrl) && !user.admin) || info) {
          throw next(Error('missing admin rights'))
        } else {
          req.user = user
          next()
        }
      }
    })(req, res, next)
  }
}

export const userC = new UserController()
