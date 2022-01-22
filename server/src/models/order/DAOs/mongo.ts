import mongoose, { Schema } from "mongoose";
import config from "../../../config";
import { Presistence } from "../../../utils/enums";
import { CartI } from "../../../interfaces/cartInterface";
import {
  OrderBaseClass,
  OrderI,
  OrderQuery,
} from "../../../interfaces/orderInterface";

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId },
    direccionEntrega: {
      pais: { type: String },
      provincia: { type: String },
      ciudad: { type: String },
      calle: { type: String, required: true },
      altura: { type: String, required: true },
      cp: { type: String, required: true },
      piso: { type: String },
      departamento: { type: String },
    },
    items: [
      new Schema(
        {
          _id: { type: String, required: true },
          precio: { type: Number, required: true },
          qty: { type: Number, required: true },
        },
        { _id: false }
      ),
    ],
    status: {
      type: String,
      enum: {
        values: ["generado", "pagado", "enviado", "finalizado"],
        message: "El estado debe ser generado, pagado, enviado o finalizado",
      },
      required: true,
    },
    total: {
      type: Number,
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

/**
 * @class Orders
 */
export class Order implements OrderBaseClass {
  private srv = `mongodb://localhost:27017/${config.MONGO_DB_NAME}`;
  private OrderModel: any;

  /**
   * @constructor
   * @param {Presistence} option
   */
  constructor(option: Presistence) {
    if (option == Presistence.MongoDBLocal) {
      this.srv = `mongodb://localhost:27017/${config.MONGO_DB_NAME}`;
    } else {
      this.srv = config.MONGO_ATLAS_URI;
    }
    mongoose.connect(this.srv);
    this.OrderModel = mongoose.model<OrderI>("order", OrderSchema);
  }

  /**
   * @description List orders
   * @param {string} query The id of the order to list, if none all orders will be returned
   * @return {OrderI[]} Array with the orders found in the file or Object with a single order
   */
  async getOrders(query: any = {}): Promise<OrderI[]> {
    if (query._id) {
      return this.OrderModel.findById(query._id, { __v: 0 });
    } else {
      return this.OrderModel.find(query, { __v: 0 });
    }
  }

  /**
   * @description  Save a new order
   * @param {CartI} cart The order to be saved
   * @return {OrderI} The order saved
   */
  async createOrder(cart: CartI): Promise<OrderI> {
    let total = 0;
    cart.products.forEach((obj: any) => {
      total += obj.product.precio * obj.qty;
    });
    const products = cart.products.map((obj: any) => {
      return {
        _id: obj.product._id,
        precio: obj.product.precio,
        qty: obj.qty,
      };
    });
    const order = {
      userId: cart.userId,
      direccionEntrega: cart.direccionEntrega,
      items: products,
      status: "generado",
      total: total,
    };
    return this.OrderModel.create(order);
  }

  /**
   * @description Update one order
   * @param {string} id The id of the order to update
   */
  async completeOrder(id: string): Promise<OrderI> {
    return this.OrderModel.findOneAndUpdate(
      { _id: id, status: "generado" },
      {
        $set: { status: "completed" },
      },
      { new: true, returnNewDocument: true }
    );
  }

  /**
   * @description Delete one order
   * @param {string} id The id of the order to delete
   */
  async deleteOrder(id: string): Promise<OrderI> {
    return this.OrderModel.findByIdAndRemove(id);
  }

  /**
   * @description Query orders
   * @param {string} query The query options
   * @return {OrderI[]} Array with the orders found
   */
  async queryOrders(query: OrderQuery): Promise<OrderI[]> {
    return this.OrderModel.find(query);
  }
}
