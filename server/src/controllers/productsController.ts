import { NextFunction, Request, Response } from 'express'
import { cartS } from '../api/cartService'
import {
  NewProductI,
  UpdateProductI,
  ProductI,
  ProductQuery,
  ProductJoiSchema,
  NewProductJoiSchema,
  ProductIdJoiSchema,
  ProductQueryJoiSchema,
} from '../interfaces/productInterface'
import { productS } from '../api/productService'
import 'express-async-errors'
import { MissingFieldsProduct, NotFound } from '../errors/errors'

class ProductsController {
  createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const newProduct = req.body as NewProductI
    await NewProductJoiSchema.validateAsync(newProduct)
    const savedProduct: ProductI = await productS.createProduct(newProduct)
    res.status(201).json({ data: savedProduct })
  }

  getProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    if (Object.keys(id).length != 0) await ProductIdJoiSchema.validateAsync(id)
    const product = await productS.getProduct(id)
    if (!product) throw new NotFound(404, 'Product not found')
    res.status(200).json({ data: product })
  }

  getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const query = req.query as ProductQuery
    if (Object.keys(query).length != 0) await ProductQueryJoiSchema.validateAsync(query)
    const products = await productS.getProducts(query)
    res.status(200).json({ data: products })
  }

  updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    const productFields = req.body as UpdateProductI
    if (Object.keys(productFields).length == 0)
      throw new MissingFieldsProduct(400, 'Missing fields', 'No fields to update')
    await ProductIdJoiSchema.validateAsync(id)
    await ProductJoiSchema.validateAsync(productFields)
    const updatedProduct = await productS.updateProduct(id, productFields)
    if (!updatedProduct) throw new NotFound(404, 'Product not found')
    res.status(200).json({ data: updatedProduct })
  }

  deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    await ProductIdJoiSchema.validateAsync(id)
    await productS.deleteProduct(id)
    await cartS.deleteProductFromAllCarts(id)
    res.status(200).json({ data: { message: 'Product deleted' } })
  }
}

export const productsC = new ProductsController()
