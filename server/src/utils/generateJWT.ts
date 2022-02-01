import jwt from 'jsonwebtoken'
import config from '../config'
import { UserI } from '../interfaces/userInterface'
import { ErrorCode } from './enums'

export const generateJWT = (user: UserI) => {
  const payload = {
    sub: user.id,
    admin: user.admin,
  }
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.JWT_SECRET_KEY,
      {
        expiresIn: config.TOKEN_KEEP_ALIVE,
      },
      function (err, token) {
        if (err) {
          reject(err)
        } else {
          resolve(token)
        }
      }
    )
  })
}
