import config from '../config'
import { CartI } from '../interfaces/cartInterface'
import { OrderI } from '../interfaces/orderInterface'
import { OrderFactoryDAO } from '../models/order/orderFactory'
import { NotFound } from '../errors/errors'

class OrderService {
  private order

  constructor() {
    this.order = OrderFactoryDAO.get(config.DB_TYPE)
  }

  async createOrder(cart: CartI): Promise<OrderI> {
    return this.order.createOrder(cart)
  }

  async getOrders(id?: string): Promise<OrderI[]> {
    return this.order.getOrders(id)
  }

  async completeOrder(id: string): Promise<OrderI> {
    return this.order.completeOrder(id)
  }

  async deleteOrder(id: string): Promise<OrderI> {
    const deletedOrder = await this.order.deleteOrder(id)
    if (!deletedOrder) throw new NotFound(404, 'Order not found')
    return deletedOrder
  }
}

export const orderS = new OrderService()
