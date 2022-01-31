import { Request, Response, NextFunction } from 'express'
import { orderS } from '../api/orderService'
// import { mailerS } from '../services/mailer';
import { ErrorCode } from '../utils/enums'
import 'express-async-errors'
import { OrderIdJoiSchema } from '../interfaces/orderInterface'

class OrderController {
  async getOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    await OrderIdJoiSchema.validateAsync(id)
    const orders = await orderS.getOrders(id)
    res.status(200).json({ data: orders })
  }

  async completeOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.body
    await OrderIdJoiSchema.validateAsync(id)
    const result = await orderS.completeOrder(id)
    if (!result) throw new Error(ErrorCode.BadRequest)
    // await mailerS.send(result);
    res.status(200).json({ data: result })
  }
}
export const orderC = new OrderController()
