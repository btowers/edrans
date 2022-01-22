import { Request, Response, NextFunction } from "express";
import { orderS } from "../api/orderService";
// import { mailerS } from '../services/mailer';
import { ErrorCode } from "../utils/enums";
import "express-async-errors";

/**
 * @class OrderController
 */
class OrderController {
  /**
   *
   * @param {Request} _req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async getOrders(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const query = { ...res.locals.query, ...res.locals.params };
    const orders = await orderS.getOrders(query);
    res.status(200).json({ data: orders });
  }

  /**
   *
   * @param {Request} _req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async completeOrder(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = res.locals.orderId;
    const result = await orderS.completeOrder(id);
    if (!result) throw new Error(ErrorCode.BadRequest);
    // await mailerS.send(result);
    res.status(200).json({ data: result });
  }
}
export const orderC = new OrderController();
