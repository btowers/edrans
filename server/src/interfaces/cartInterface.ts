import Joi from 'joi'
import { ObjectIdValidator } from '../utils/idValidator'
import { UserI } from './userInterface'

export interface CartItemI {
  product: string
  qty: number
}

export interface NewCartI {
  direccionEntrega: {
    calle: string
    altura: string
    cp: string
    piso?: string
    departamento?: string
  }
  products: [CartItemI]
}

export interface CartI extends NewCartI {
  id: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface CartBaseClass {
  getCart(userId: string): Promise<CartI>
  createCart(user: UserI): Promise<CartI>
  emptyCart(userId: string): Promise<CartI>
  addProductToCart(userId: string, product: CartItemI): Promise<any>
  deleteProductFromCart(cartId: string, product: CartItemI): Promise<any>
}

export const CartItemJoiSchema = Joi.object({
  product: Joi.string().custom(ObjectIdValidator).messages({
    'id.error': `invalid ObjectId`,
  }),
  qty: Joi.number().min(0),
})
