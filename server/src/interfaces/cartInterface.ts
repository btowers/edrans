import mongoose from "mongoose";
import { UserI } from "./userInterface";

export interface CartI extends NewCartI {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  direccionEntrega: {
    calle: string;
    altura: string;
    cp: string;
    piso?: string;
    departamento?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface NewCartI {
  direccionEntrega: {
    calle: string;
    altura: string;
    cp: string;
    piso?: string;
    departamento?: string;
  };
  products: [CartItemI];
}

export interface CartItemI {
  product: mongoose.Types.ObjectId;
  qty: number;
}

export interface CartBaseClass {
  getCart(userId: string): Promise<CartI>;
  createCart(user: UserI): Promise<CartI>;
  emptyCart(userId: string): Promise<CartI>;
  addProductToCart(userId: string, product: CartItemI): Promise<any>;
  deleteProductFromCart(cartId: string, product: CartItemI): Promise<any>;
}
