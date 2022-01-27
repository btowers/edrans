import mongoose, { Schema } from 'mongoose'
import config from '../../../config'
import { Presistence } from '../../../utils/enums'
import { CartI } from '../../../interfaces/cartInterface'
import { OrderBaseClass, OrderI, OrderQuery } from '../../../interfaces/orderInterface'

const OrderSchema = new Schema<OrderI>(
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
      {
        _id: false,
        id: { type: String, required: true },
        precio: { type: Number, required: true },
        qty: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: {
        values: ['generado', 'pagado', 'enviado', 'finalizado'],
        message: 'El estado debe ser generado, pagado, enviado o finalizado',
      },
      required: true,
    },
    total: {
      type: Number,
    },
  },
  { timestamps: { createdAt: 'createdAt' } }
)

OrderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export class Order implements OrderBaseClass {
  private srv = `mongodb://localhost:27017/${config.MONGO_DB_NAME}`
  private OrderModel: any

  constructor(option: Presistence) {
    if (option == Presistence.MongoDBLocal) {
      this.srv = `mongodb://localhost:27017/${config.MONGO_DB_NAME}`
    } else {
      this.srv = config.MONGO_ATLAS_URI
    }
    mongoose.connect(this.srv)
    this.OrderModel = mongoose.model<OrderI>('order', OrderSchema)
  }

  async getOrders(id?: string): Promise<OrderI[]> {
    if (id) return this.OrderModel.findById(id)
    else return this.OrderModel.find()
  }

  async createOrder(cart: CartI): Promise<OrderI> {
    let total = 0
    cart.products.forEach((obj: any) => {
      total += obj.product.precio * obj.qty
    })
    const products = cart.products.map((obj: any) => {
      return {
        id: obj.product.id,
        precio: obj.product.precio,
        qty: obj.qty,
      }
    })
    const order = {
      userId: cart.userId,
      direccionEntrega: cart.direccionEntrega,
      items: products,
      status: 'generado',
      total: total,
    }
    return this.OrderModel.create(order)
  }

  async completeOrder(id: string): Promise<OrderI> {
    return this.OrderModel.findOneAndUpdate(
      { id: id, status: 'generado' },
      {
        $set: { status: 'completed' },
      },
      { new: true, returnNewDocument: true }
    )
  }

  async deleteOrder(id: string): Promise<OrderI> {
    return this.OrderModel.findByIdAndRemove(id)
  }

  async queryOrders(query: OrderQuery): Promise<OrderI[]> {
    return this.OrderModel.find(query)
  }
}
