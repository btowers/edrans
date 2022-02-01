import { Request, Response, NextFunction } from 'express'
import { orderS } from '../api/orderService'
import { OrderIdJoiSchema } from '../interfaces/orderInterface'
import 'express-async-errors'

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
    if (!result) throw new Error('order not found')
    res.status(200).json({ data: result })
  }
}
export const orderC = new OrderController()
