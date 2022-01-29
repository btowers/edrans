import { Request, Response, NextFunction } from 'express'
import config from '../config'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import 'express-async-errors'
import { ErrorCode } from '../utils/enums'

class UserController {
  async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('login', { session: false }, function (err, user, info) {
      if (err) {
        res.status(400).json({ error: err.message })
      } else {
        let payload = null
        if (!user) {
          res.status(401).json({ error: info })
        } else {
          payload = {
            sub: user.id,
          }
          jwt.sign(
            payload,
            config.JWT_SECRET_KEY,
            {
              expiresIn: config.TOKEN_KEEP_ALIVE,
            },
            function (err, token) {
              if (err) {
                throw Error(ErrorCode.BadRequest)
              } else {
                res.status(200).json({ token })
              }
            }
          )
        }
      }
    })(req, res, next)
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('signup', { session: false }, function (err, user, info) {
      if (err) {
        res.status(400).json({ error: err.message })
      } else {
        if (!user) {
          res.status(400).json({ error: info })
        } else {
          res.status(201).json({ data: user })
        }
      }
    })(req, res, next)
  }

  async facebookLogin(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('facebook', { session: false }, function (err, user, info) {
      if (err) {
        res.status(400).json({ error: err.message })
      } else {
        if (!user) {
          res.status(400).json({ error: info })
        } else {
          res.status(201).json({ data: user })
        }
      }
    })(req, res, next)
  }

  async isAuth(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
      const protectedAdminRoutes: string[] = ['/api/products']
      if (err) {
        res.status(400).json({ error: err.message })
      } else {
        if (!user) {
          res.status(401).json(ErrorCode.Unauthorized)
        } else if ((protectedAdminRoutes.includes(req.baseUrl) && !user.admin) || info) {
          res.status(401).json({ error: 'Unauthorized: user not admin' })
        } else {
          req.user = user
          next()
        }
      }
    })(req, res, next)
  }
}

export const userC = new UserController()
