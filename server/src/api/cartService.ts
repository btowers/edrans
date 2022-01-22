import { CartFactoryDAO } from "../models/cart/cartFactory";
import { CartI, CartItemI } from "../interfaces/cartInterface";
import { UserI } from "../interfaces/userInterface";
import { ErrorCode } from "../utils/enums";
import { productS } from "./productService";
import config from "../config";
import { ProductQuery } from "../interfaces/productInterface";

/**
 * @class CartService
 */
class CartService {
  private carts;

  /**
   * @constructor Cart
   * @param {string} cartId
   */
  constructor() {
    this.carts = CartFactoryDAO.get(config.DB_TYPE);
  }

  /**
   *
   * @param {string} userId
   * @return {Promise<CartI>}
   */
  async getCart(userId: string): Promise<CartI> {
    return this.carts.getCart(userId);
  }

  /**
   *
   * @param {UserI} user
   * @return {Promise<CartI>}
   */
  async createCart(user: UserI): Promise<CartI> {
    return this.carts.createCart(user);
  }

  /**
   *
   * @param {string} userId
   * @return {Promise<CartI>}
   */
  async emptyCart(userId: string): Promise<CartI> {
    return this.carts.emptyCart(userId);
  }

  /**
   *
   * @param {string} cartId
   * @param {CartItemI} cartItem
   * @return {Promise<CartI>}
   */
  async addProductToCart(cartId: string, cartItem: CartItemI): Promise<CartI> {
    const query: ProductQuery = { _id: cartItem.product };
    const result = await productS.getProducts(query);
    if (!result.length) throw new Error(ErrorCode.BadRequest);
    if (result[0].stock < cartItem.qty)
      throw new Error(ErrorCode.NotEnoughStock);
    return this.carts.addProductToCart(cartId, cartItem);
  }

  /**
   *
   * @param {string} cartId
   * @param {CartItemI} cartItem
   */
  async deleteProductFromCart(cartId: string, cartItem: CartItemI) {
    const query = { _id: cartItem.product };
    const result = await productS.getProducts(query);
    if (result.length < 1) throw new Error(ErrorCode.BadRequest);
    return this.carts.deleteProductFromCart(cartId, cartItem);
  }

  /**
   *
   * @param {String} productId
   */
  async deleteProductFromAllCarts(productId: string) {
    return this.carts.deleteProductFromAllCarts(productId);
  }
}

export const cartS = new CartService();
