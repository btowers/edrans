import config from '../config'
import { ErrorCode } from '../utils/enums'
import { CartI } from '../interfaces/cartInterface'
import { OrderI } from '../interfaces/orderInterface'
import { OrderFactoryDAO } from '../models/order/orderFactory'

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
    if (!deletedOrder) throw Error(ErrorCode.OrderNotFound)
    return deletedOrder
  }
}

export const orderS = new OrderService()
