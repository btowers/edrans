import { NextFunction, Request, Response } from 'express'
import { cartS } from '../api/cartService'
import {
    NewProductI,
    UpdateProductI,
    ProductI,
    ProductQuery,
    ProductJoiSchema,
    NewProductJoiSchema,
    ProductQueryJoiSchema,
} from '../interfaces/productInterface'
import { productS } from '../api/productService'
import { ErrorCode } from '../utils/enums'
import 'express-async-errors'

class ProductsController {
    createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const newProduct = req.body as NewProductI
        await NewProductJoiSchema.validateAsync(newProduct)
        const savedProduct: ProductI = await productS.createProduct(newProduct)
        res.status(201).json({ data: savedProduct })
    }

    getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const query = req.query as ProductQuery
        // const { nombre, minPrice, maxPrice, minStock, maxStock } = req.query as ProductQuery
        // if (nombre) query.nombre = nombre.toString()
        // if (minPrice) query.minPrice = Number(minPrice)
        // if (maxPrice) query.maxPrice = Number(maxPrice)
        // if (minStock) query.minStock = Number(minStock)
        // if (maxStock) query.maxStock = Number(maxStock)
        if (Object.keys(query).length != 0) {
            await ProductQueryJoiSchema.validateAsync(query)
        }
        const products = await productS.getProducts(query)
        res.status(200).json({ data: products })
    }

    updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params
        const productFields = req.body as UpdateProductI
        await ProductJoiSchema.validateAsync(productFields)
        const updatedProduct = await productS.updateProduct(id, productFields)
        if (!updatedProduct) throw Error(ErrorCode.ProductsNotFound)
        res.status(200).json({ data: updatedProduct })
    }

    deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params
        await productS.deleteProduct(id)
        await cartS.deleteProductFromAllCarts(id)
        res.status(200).json({ data: { message: 'Product deleted' } })
    }
}

export const productsC = new ProductsController()
