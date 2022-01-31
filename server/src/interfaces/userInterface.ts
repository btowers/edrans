import Joi from 'joi'
import { ObjectIdValidator } from '../utils/idValidator'

export interface UserI extends NewUserI {
  id: string
}

export interface NewUserI {
  nombre: string
  direccion: {
    calle: string
    altura: string
    cp: string
    piso: string
    departamento: string
  }
  identificador: string
  email: string
  password: string
  confirmPassword: string
  admin: boolean
  fbId: string
}

export interface UserBaseClass {
  create(user: NewUserI): Promise<UserI>
  getById(id: string): Promise<UserI>
  getByEmail(email: string): Promise<UserI>
  update(id: string, user: UserI): Promise<UserI>
  delete(id: string): Promise<UserI>
  isValidPassword(user: UserI, password: string): Promise<boolean>
}

export const UserJoiSchema = Joi.object({
  nombre: Joi.string().required().min(3).max(50),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .required()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)
    .error(new Error('invalid password format')),
  confirmPassword: Joi.string().required(),
  direccion: {
    calle: Joi.string().required().max(150),
    altura: Joi.number().required().min(0),
    cp: Joi.string().required().max(20),
    piso: Joi.number().optional().allow('').max(5),
    departamento: Joi.string().optional().allow('').max(5),
  },
  identificador: Joi.string().required().max(150),
  admin: Joi.boolean(),
})

export const UserCredentialsJoiSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .required()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)
    .error(new Error('invalid password format'))
    .required(),
})

export const UserIdJoiSchema = Joi.string().custom(ObjectIdValidator).messages({
  'id.error': `invalid ObjectId`,
})
