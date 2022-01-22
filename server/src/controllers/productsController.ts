import { NextFunction, Request, Response } from "express";
import { cartS } from "../api/cartService";
import { ProductI, ProductQuery } from "../interfaces/productInterface";
import { productS } from "../api/productService";
import { ErrorCode } from "../utils/enums";
import "express-async-errors";

/**
 * @class ProductsController
 */
class ProductsController {
  /**
   * @description Save a new product
   * @param {Request} _req
   * @param {Response} res
   * @param {NextFunction} next
   */
  createProduct = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const savedProduct: ProductI = await productS.createProduct(
      res.locals.product
    );
    res.status(201).json({ data: savedProduct });
  };

  /**
   * @description Get products
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const query: ProductQuery = {};
    const { nombre, codigo, minPrice, maxPrice, minStock, maxStock } =
      req.query;
    if (nombre) query.nombre = nombre.toString();
    if (codigo) query.codigo = codigo.toString();
    if (minPrice) query.minPrice = Number(minPrice);
    if (maxPrice) query.maxPrice = Number(maxPrice);
    if (minStock) query.minStock = Number(minStock);
    if (maxStock) query.maxStock = Number(maxStock);
    const products = await productS.getProducts(query);
    res.status(200).json({ data: products });
  };

  /**
   * @description Update a product
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const updatedProduct = await productS.updateProduct(
      res.locals.params._id,
      res.locals.product
    );
    if (!updatedProduct) throw Error(ErrorCode.ProductsNotFound);
    res.status(200).json({ data: updatedProduct });
  };

  /**
   * @description Delete a product
   * @param {Request} _req
   * @param {Response} res
   * @param {NextFunction} next
   */
  deleteProduct = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await productS.deleteProduct(res.locals.params._id);
    await cartS.deleteProductFromAllCarts(res.locals.params._id);
    res.status(200).json({ data: { message: "Product deleted" } });
  };
}

export const productsC = new ProductsController();
