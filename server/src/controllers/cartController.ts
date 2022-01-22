import { NextFunction, Request, Response } from "express";
import { cartS } from "../api/cartService";
import { orderS } from "../api/orderService";
import { mailerS } from "../services/mailer";
import { UserI } from "../interfaces/userInterface";
import { CartItemI } from "../interfaces/cartInterface";
import { ErrorCode } from "../utils/enums";
import "express-async-errors";

/**
 * @class CartController
 */
class CartController {
  /**
   * @description Get cart
   * @param {Request} req
   * @param {Response} res
   * @param  {NextFunction} next
   */
  getCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId: string = req.user!._id;
    const cart = await cartS.getCart(userId);
    if (!cart) throw new Error(ErrorCode.CartNotFound);
    res.status(200).json({ data: cart });
  };

  /**
   * @description Buy Cart
   * @param {Request} req
   * @param {Response} res
   * @param  {NextFunction} next
   */
  buyCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const user: UserI = req.user!;
    const cart = await cartS.getCart(user._id);
    if (cart.products.length < 1) throw new Error(ErrorCode.CartEmpty);
    const order = await orderS.createOrder(cart);
    await cartS.emptyCart(user._id);
    await mailerS.send(user, cart);
    res.status(200).json({ data: order });
  };

  /**
   * @description Add product to cart
   * @param {Request} req
   * @param {Response} res
   * @param  {NextFunction} next
   */
  addProductToCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId: string = req.user!._id;
    const cartItem = req.body as CartItemI;
    const result = await cartS.addProductToCart(userId, cartItem);
    res.status(201).json({ data: result });
  };

  /**
   * @description Delete product from cart
   * @param {Request} req
   * @param {Response} res
   * @param  {NextFunction} next
   */
  deleteProductFromCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId: string = req.user!._id;
    const product = res.locals.product;
    const result = await cartS.deleteProductFromCart(userId, product);
    res.status(200).json({ data: result });
  };
}

export const cartC = new CartController();
