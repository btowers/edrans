import config from "../config";
import { imageS } from "../services/image";
import { ErrorCode } from "../utils/enums";
import { ProductFactoryDAO } from "../models/product/productFactory";
import {
  NewProductI,
  ProductI,
  ProductQuery,
} from "../interfaces/productInterface";

/**
 * @class ProductService
 */
class ProductService {
  private product;

  /**
   * @constructor Product
   * @param {string} productId
   */
  constructor() {
    this.product = ProductFactoryDAO.get(config.DB_TYPE);
  }

  /**
   * @description Save a new product
   * @param {NewProductI} product
   */
  async createProduct(product: NewProductI): Promise<ProductI> {
    return this.product.createProduct(product);
  }

  /**
   * @description Get products
   * @param {any} query
   */
  async getProducts(query?: ProductQuery): Promise<ProductI[]> {
    return this.product.getProducts(query);
  }

  /**
   * @description Update a product
   * @param {string} id
   * @param {NewProductI} product
   */
  async updateProduct(id: string, product: NewProductI): Promise<ProductI> {
    return this.product.updateProduct(id, product);
  }

  /**
   * @description Update stock of a product
   * @param {string} productId
   * @param {number} qty
   */
  async updateStockProduct(productId: string, qty: number): Promise<ProductI> {
    const updatedProduct = await this.product.updateStockProduct(
      productId,
      qty
    );
    if (!updatedProduct) throw Error(ErrorCode.ProductsNotFound);
    return updatedProduct;
  }

  /**
   * @description Update images of a product
   * @param {string} productId
   * @param {string} filename
   */
  async updateImagesProduct(
    productId: string,
    filename: string
  ): Promise<ProductI> {
    const updatedProduct = await this.product.updateImagesProduct(
      productId,
      filename
    );
    if (!updatedProduct) throw Error(ErrorCode.ProductsNotFound);
    return updatedProduct;
  }

  /**
   * @description Delete a product
   * @param {string} _id
   */
  async deleteProduct(_id: string): Promise<ProductI> {
    const product = await this.product.getProducts({ _id });
    if (!product) throw Error(ErrorCode.ProductsNotFound);
    if (product[0].fotos.length) await imageS.deleteImages(product[0].fotos); // delete images from S3 before delete product
    return this.product.deleteProduct(_id);
  }

  /**
   * @description Delete an image from products
   * @param {string} productId
   * @param {string} filename
   */
  async deleteImageFromProduct(
    productId: string,
    filename: string
  ): Promise<ProductI> {
    return await this.product.deleteImageFromProduct(productId, filename);
  }
}

export const productS = new ProductService();
