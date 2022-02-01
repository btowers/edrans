import { CartFactoryDAO } from '../models/cart/cartFactory'
import { CartI, CartItemI } from '../interfaces/cartInterface'
import { UserI } from '../interfaces/userInterface'
import { ErrorCode } from '../utils/enums'
import { productS } from './productService'
import config from '../config'
import { ProductQuery } from '../interfaces/productInterface'
import { NotFound } from '../errors/errors'

class CartService {
  private carts

  constructor() {
    this.carts = CartFactoryDAO.get(config.DB_TYPE)
  }

  async getCart(userId: string): Promise<CartI> {
    return this.carts.getCart(userId)
  }

  async createCart(user: UserI): Promise<CartI> {
    return this.carts.createCart(user)
  }

  async emptyCart(userId: string): Promise<CartI> {
    return this.carts.emptyCart(userId)
  }

  async addProductToCart(cartId: string, cartItem: CartItemI): Promise<CartI> {
    const query: ProductQuery = { id: cartItem.product }
    const result = await productS.getProducts(query)
    if (!result.length) throw new Error(ErrorCode.BadRequest)
    if (result[0].stock < cartItem.qty) throw new Error(ErrorCode.NotEnoughStock)
    return this.carts.addProductToCart(cartId, cartItem)
  }

  async deleteProductFromCart(cartId: string, cartItem: CartItemI): Promise<void> {
    const query = { id: cartItem.product }
    const result = await productS.getProducts(query)
    if (result.length < 1) throw new NotFound(404, 'Product not found')
    return this.carts.deleteProductFromCart(cartId, cartItem)
  }

  async deleteProductFromAllCarts(productId: string): Promise<void> {
    return this.carts.deleteProductFromAllCarts(productId)
  }
}

export const cartS = new CartService()
