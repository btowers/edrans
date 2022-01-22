import config from "../config";
import { ErrorCode } from "../utils/enums";
import { CartI } from "../interfaces/cartInterface";
import { OrderI } from "../interfaces/orderInterface";
import { OrderFactoryDAO } from "../models/order/orderFactory";

/**
 * @class OrderService
 */
class OrderService {
  private order;

  /**
   * @constructor Order
   * @param {string} orderId
   */
  constructor() {
    this.order = OrderFactoryDAO.get(config.DB_TYPE);
  }

  /**
   * @description Save a new order
   * @param {CartI} cart
   */
  async createOrder(cart: CartI): Promise<OrderI> {
    return this.order.createOrder(cart);
  }

  /**
   * @description Get orders
   * @param {any} query
   */
  async getOrders(query?: any): Promise<OrderI[]> {
    return this.order.getOrders(query);
  }

  /**
   * @description Update an order
   * @param {string} id
   */
  async completeOrder(id: string): Promise<OrderI> {
    return this.order.completeOrder(id);
  }

  /**
   * @description Delete an order
   * @param {string} id
   */
  async deleteOrder(id: string): Promise<OrderI> {
    const deletedOrder = await this.order.deleteOrder(id);
    if (!deletedOrder) throw Error(ErrorCode.OrderNotFound);
    return deletedOrder;
  }
}

export const orderS = new OrderService();
