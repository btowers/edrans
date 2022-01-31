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

export interface UpdateUserI {
  direccion: {
    calle?: string
    altura?: string
    cp?: string
    piso?: string
    departamento?: string
  }
  identificador?: string
  password?: string
  confirmPassword?: string
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
    altura: Joi.number().required().min(0).max(9999),
    cp: Joi.string().required().max(9999),
    piso: Joi.number().optional().allow('').max(9999),
    departamento: Joi.string().optional().allow('').max(3),
  },
  identificador: Joi.string()
    .min(7)
    .max(8)
    .pattern(/^[0-9]+$/),
  admin: Joi.boolean(),
})

export const UserUpdateJoiSchema = Joi.object({
  password: Joi.string()
    .optional()
    .allow('')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)
    .error(new Error('invalid password format')),
  confirmPassword: Joi.string().optional().allow(''),
  direccion: {
    calle: Joi.string().optional().allow('').max(150),
    altura: Joi.number().optional().allow('').min(0).max(9999),
    cp: Joi.string().optional().allow('').max(9999),
    piso: Joi.number().optional().allow('').max(9999),
    departamento: Joi.string().optional().allow('').max(3),
  },
  identificador: Joi.string()
    .optional()
    .allow('')
    .min(7)
    .max(8)
    .pattern(/^[0-9]+$/),
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
