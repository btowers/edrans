import { Request, Response, NextFunction } from "express";
import {
  ProductQuery,
  updateProductI,
  NewProductI,
  ProductJoiSchema,
} from "../interfaces/productInterface";
import { validatorS } from "../services/validator";
import { ErrorCode } from "../utils/enums";
import "express-async-errors";

export interface BodyI extends updateProductI {
  filename?: string;
  product: string;
  qty: number;
}

/**
 * @class ValidatorMiddleware
 * @description Validate the request params, query and body
 */
class ValidatorMiddleware {
  /**
   * @description Validate New Products
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  newProduct = async (req: Request, res: Response, next: NextFunction) => {
    const product: NewProductI = {
      nombre: req.body.nombre.toString(),
      descripcion: req.body.descripcion.toString(),
      categoria: req.body.categoria.toString().toLowerCase(),
      precio: Number(req.body.precio),
      stock: Number(req.body.stock),
    };
    await ProductJoiSchema.validateAsync(product);
    res.locals.product = product;
    next();
  };

  /**
   * @description Validate Update Products
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const {
      nombre,
      descripcion,
      categoria,
      fotos,
      precio,
      stock,
    }: updateProductI = req.body;
    const product: updateProductI = {};
    if (nombre) product.nombre = nombre.toString();
    if (descripcion) product.descripcion = descripcion.toString();
    if (categoria) product.categoria = categoria.toString().toLowerCase();
    if (fotos) product.fotos = fotos;
    if (precio) product.precio = Number(precio);
    if (stock) product.stock = Number(stock);
    if (Object.keys(product).length) {
      await ProductJoiSchema.validateAsync(product);
      res.locals.product = product;
    } else throw new Error(ErrorCode.BadRequest);
    next();
  };

  /**
   * @description Validate Params
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  params = async (req: Request, res: Response, next: NextFunction) => {
    const { id, category } = req.params;
    const params: ProductQuery = {};
    if (id) params._id = id.toString();
    if (category) params.categoria = category.toString().toLowerCase();
    if (Object.keys(params).length) {
      await validatorS.params(params);
      res.locals.params = params;
    }
    next();
  };

  /**
   * @description Validate Query Parms
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  query = async (req: Request, res: Response, next: NextFunction) => {
    const { nombre }: ProductQuery = req.query;
    const query: ProductQuery = {};
    if (nombre) query.nombre = nombre.toString();
    if (Object.keys(query).length) {
      await validatorS.query(query);
      res.locals.query = query;
    }
    next();
  };

  /**
   * @description Validate Body Params
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  productToCart = async (req: Request, res: Response, next: NextFunction) => {
    const body: BodyI = req.body;
    await validatorS.productToCart(body);
    res.locals.product = body;
    next();
  };

  /**
   * @description Validate Body Params
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  orderId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    let orderId: string;
    if (id) {
      orderId = id.toString();
      await validatorS.id(orderId);
      res.locals.orderId = orderId;
    }
    next();
  };

  /**
   * @description Validate Body Params
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {Promise}
   * @memberof ValidatorMiddleware
   */
  body = async (req: Request, res: Response, next: NextFunction) => {
    const body: BodyI = req.body;
    // if (filename) body.filename = filename.toString();
    // if (product) body.product = product.toString();
    if (Object.keys(body).length) {
      await validatorS.body(body);
      res.locals.body = body;
    }
    next();
  };
}

export const validatorM = new ValidatorMiddleware();
