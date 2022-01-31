import Joi from 'joi'
import mongoose from 'mongoose'
import { ObjectIdValidator } from '../utils/idValidator'
import { CartI } from './cartInterface'

export interface OrderI extends newOrderI {
  id: string
  direccionEntrega: {
    calle: string
    altura: string
    cp: string
    piso?: string
    departamento?: string
  }
  createdAt: Date
}

export interface newOrderI {
  userId: mongoose.Types.ObjectId
  items: {
    product: mongoose.Types.ObjectId
    precio: number
    qty: number
  }[]
  status: 'generado' | 'pagado' | 'enviado' | 'finalizado'
  total: number
}

export interface OrderQuery {
  id?: string
}

export interface OrderBaseClass {
  getOrders(id?: string): Promise<OrderI[]>
  createOrder(cart: CartI): Promise<OrderI>
  completeOrder(id: string): Promise<OrderI>
  deleteOrder(id: string): Promise<OrderI>
  queryOrders(options: OrderQuery): Promise<OrderI[]>
}

export const OrderIdJoiSchema = Joi.string().custom(ObjectIdValidator).messages({
  'id.error': `invalid ObjectId`,
})
