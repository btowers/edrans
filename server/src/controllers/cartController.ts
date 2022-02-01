import { NextFunction, Request, Response } from 'express'
import { cartS } from '../api/cartService'
import { orderS } from '../api/orderService'
import { mailerS } from '../services/mailer'
import { UserI } from '../interfaces/userInterface'
import { CartItemI, CartItemJoiSchema } from '../interfaces/cartInterface'
import { NotFound, CartEmpty } from '../errors/errors'
import 'express-async-errors'

class CartController {
  getCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.user as UserI
    const cart = await cartS.getCart(id)
    if (!cart) throw new NotFound(404, 'Cart not found')
    res.status(200).json({ data: cart })
  }

  buyCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = req.user as UserI
    const cart = await cartS.getCart(user.id)
    if (cart.products.length < 1) throw new CartEmpty(400, 'Cart is empty')
    const order = await orderS.createOrder(cart)
    await cartS.emptyCart(user.id)
    await mailerS.send(user, cart)
    res.status(200).json({ data: order })
  }

  addProductToCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.user as UserI
    const cartItem = req.body as CartItemI
    await CartItemJoiSchema.validateAsync(cartItem)
    const result = await cartS.addProductToCart(id, cartItem)
    res.status(201).json({ data: result })
  }

  deleteProductFromCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.user as UserI
    const cartItem = req.body as CartItemI
    await CartItemJoiSchema.validateAsync(cartItem)
    const result = await cartS.deleteProductFromCart(id, cartItem)
    res.status(200).json({ data: result })
  }
}

export const cartC = new CartController()
