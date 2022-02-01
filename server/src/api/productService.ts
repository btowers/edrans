import config from '../config'
import { S3 } from '../services/S3'
import { ErrorCode } from '../utils/enums'
import { ProductFactoryDAO } from '../models/product/productFactory'
import { NewProductI, UpdateProductI, ProductI, ProductQuery } from '../interfaces/productInterface'
import { NotFound } from '../errors/errors'

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
    if (!updatedProduct) throw new NotFound(404, 'Product not found')
    return updatedProduct
  }

  async updateImagesProduct(productId: string, filename: string): Promise<ProductI> {
    const updatedProduct = await this.product.updateImagesProduct(productId, filename)
    if (!updatedProduct) throw new NotFound(404, 'Product not found')
    return updatedProduct
  }

  async deleteImageFromProduct(productId: string, filename: string): Promise<ProductI> {
    return await this.product.deleteImageFromProduct(productId, filename)
  }

  async deleteProduct(id: string): Promise<ProductI> {
    const product = await this.product.getProduct(id)
    if (!product) throw new NotFound(404, 'Product not found')
    if (product.fotos.length) await S3.deleteImages(product.fotos) // delete images from S3 before delete product
    return this.product.delete(id)
  }
}

export const productS = new ProductService()
