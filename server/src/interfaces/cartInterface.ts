import mongoose from 'mongoose'
import { UserI } from './userInterface'

export interface CartItemI {
    product: mongoose.Types.ObjectId
    qty: number
}
export interface NewCartI {
    direccionEntrega: {
        calle: string
        altura: string
        cp: string
        piso?: string
        departamento?: string
    }
    products: [CartItemI]
}
export interface CartI extends NewCartI {
    _id: mongoose.Types.ObjectId
    userId: mongoose.Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

export interface CartBaseClass {
    getCart(userId: string): Promise<CartI>
    createCart(user: UserI): Promise<CartI>
    emptyCart(userId: string): Promise<CartI>
    addProductToCart(userId: string, product: CartItemI): Promise<any>
    deleteProductFromCart(cartId: string, product: CartItemI): Promise<any>
}
