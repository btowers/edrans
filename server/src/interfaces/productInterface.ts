import Joi from 'joi'
import { ObjectIdValidator } from '../utils/idValidator'

export interface ProductI extends NewProductI {
  id: string
  fotos: Array<string>
}

export interface NewProductI {
  nombre: string
  descripcion: string
  categoria: string
  precio: number
  stock: number
}

export interface UpdateProductI {
  nombre?: string
  descripcion?: string
  categoria?: string
  fotos?: Array<string>
  precio?: number
  stock?: number
}

export interface ProductQuery {
  categoria?: string
  id?: string
  nombre?: string
  minPrice?: number
  maxPrice?: number
  minStock?: number
  maxStock?: number
}

export interface ProductBaseClass {
  getProducts(query?: ProductQuery): Promise<ProductI[]>
  create(data: NewProductI): Promise<ProductI>
  update(id: string, product: NewProductI): Promise<ProductI>
  updateStockProduct(id: string, qty: number): Promise<ProductI>
  delete(id: string): Promise<ProductI>
}

export const NewProductJoiSchema = Joi.object({
  nombre: Joi.string().required().max(50).min(3),
  categoria: Joi.string().required().max(50).min(3),
  descripcion: Joi.string().required(),
  stock: Joi.number().required().min(0),
  precio: Joi.number().required().min(0),
})

export const ProductJoiSchema = Joi.object({
  nombre: Joi.string().max(50).min(3),
  descripcion: Joi.string().max(500).min(3),
  categoria: Joi.string().max(50).min(3),
  foto: Joi.string(),
  stock: Joi.number().min(0).max(1000),
  precio: Joi.number().min(0).max(1000000),
})

export const ProductQueryJoiSchema = Joi.object({
  nombre: Joi.string().max(50).min(3),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(0),
  minStock: Joi.number().min(0),
  maxStock: Joi.number().min(0),
})

export const ProductIdJoiSchema = Joi.string().custom(ObjectIdValidator).messages({
  'id.error': `invalid ObjectId`,
})
