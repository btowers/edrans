import mongoose from "mongoose";
import { CartI } from "./cartInterface";

export interface OrderI extends newOrderI {
  _id: mongoose.Types.ObjectId;
  direccionEntrega: {
    calle: string;
    altura: string;
    cp: string;
    piso?: string;
    departamento?: string;
  };
  createdAt: Date;
}

export interface newOrderI {
  userId: mongoose.Types.ObjectId;
  items: {
    product: mongoose.Types.ObjectId;
    precio: number;
    qty: number;
  }[];
  status: string;
  total: number;
}

export interface OrderQuery {
  _id?: string;
}

export interface OrderBaseClass {
  getOrders(id?: string): Promise<OrderI[]>;
  createOrder(cart: CartI): Promise<OrderI>;
  completeOrder(id: string): Promise<OrderI>;
  deleteOrder(id: string): Promise<OrderI>;
  queryOrders(options: OrderQuery): Promise<OrderI[]>;
}
