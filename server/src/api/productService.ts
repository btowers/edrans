import config from '../config'
import { imageS } from '../services/image'
import { ErrorCode } from '../utils/enums'
import { ProductFactoryDAO } from '../models/product/productFactory'
import { NewProductI, UpdateProductI, ProductI, ProductQuery } from '../interfaces/productInterface'

class ProductService {
  private product

  constructor() {
    this.product = ProductFactoryDAO.get(config.DB_TYPE)
  }

  async createProduct(product: NewProductI): Promise<ProductI> {
    return this.product.create(product)
  }

  async getProduct(id: string): Promise<ProductI> {
    return this.product.getProduct(id)
  }

  async getProducts(query?: ProductQuery): Promise<ProductI[]> {
    return this.product.getProducts(query)
  }

  async updateProduct(id: string, product: UpdateProductI): Promise<ProductI> {
    return this.product.update(id, product)
  }

  async updateStockProduct(productId: string, qty: number): Promise<ProductI> {
    const updatedProduct = await this.product.updateStockProduct(productId, qty)
    if (!updatedProduct) throw Error(ErrorCode.ProductsNotFound)
    return updatedProduct
  }

  async updateImagesProduct(productId: string, filename: string): Promise<ProductI> {
    const updatedProduct = await this.product.updateImagesProduct(productId, filename)
    if (!updatedProduct) throw Error(ErrorCode.ProductsNotFound)
    return updatedProduct
  }

  async deleteProduct(id: string): Promise<ProductI> {
    const product = await this.product.getProducts({ id })
    if (!product) throw Error(ErrorCode.ProductsNotFound)
    if (product[0].fotos.length) await imageS.deleteImages(product[0].fotos) // delete images from S3 before delete product
    return this.product.delete(id)
  }

  async deleteImageFromProduct(productId: string, filename: string): Promise<ProductI> {
    return await this.product.deleteImageFromProduct(productId, filename)
  }
}

export const productS = new ProductService()
