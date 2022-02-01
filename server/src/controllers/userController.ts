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
import {
  MissingFieldsUser,
  NotFound,
  Unauthorized,
  UserExists,
  UserNotExists,
  UserNotLoggedIn,
  UserValidation,
} from '../errors/errors'
import 'express-async-errors'

class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user as UserI
    const user = await userS.getUserById(id)
    if (!user) throw new NotFound(404, 'User not found')
    res.status(200).json({ data: user })
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const userFields = req.body as UpdateUserI
    if (Object.keys(userFields).length == 0)
      throw new MissingFieldsUser(400, 'Missing fields', 'No fields to update')
    await UserIdJoiSchema.validateAsync(id)
    await UserUpdateJoiSchema.validateAsync(userFields)
    const updatedUser = await userS.updateUser(id, userFields)
    if (!updatedUser) throw new NotFound(404, 'User not found')
    res.status(200).json({ data: updatedUser })
  }

  async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('login', { session: false }, async (err, user, info) => {
      if (err) throw new UserValidation(400, err.message)
      else {
        if (!user) throw new UserNotExists(400, info.message)
        else {
          const token = await generateJWT(user)
          if (!token) throw new Unauthorized(401, 'missing token')
          else res.cookie('token', token).json({ token })
        }
      }
    })(req, res, next)
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('signup', { session: false }, function (err, user, info) {
      if (err) throw new UserValidation(400, err.message)
      else {
        if (!user) throw new UserExists(400, info.message)
        else res.status(201).json({ data: user })
      }
    })(req, res, next)
  }

  async facebookLogin(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      'facebook',
      { session: false, scope: ['email'] },
      async function (err, user, info) {
        if (err) throw new UserValidation(400, err.message)
        else {
          if (!user) throw new UserNotExists(400, info.message)
          else {
            const token = await generateJWT(user)
            if (!token) throw new Unauthorized(401, 'missing token')
            else res.cookie('token', token).redirect('/')
          }
        }
      }
    )(req, res, next)
  }

  async isAuth(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
      const protectedAdminRoutes: string[] = ['/api/products']
      if (err) throw new Unauthorized(401, err.message)
      else {
        if (!user) throw new UserNotLoggedIn(401, info.message)
        else if ((protectedAdminRoutes.includes(req.baseUrl) && !user.admin) || info) {
          throw new Unauthorized(401, 'missing admin rights')
        } else {
          req.user = user
          next()
        }
      }
    })(req, res, next)
  }
}

export const userC = new UserController()
