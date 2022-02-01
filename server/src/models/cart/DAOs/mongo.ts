import mongoose, { Schema } from 'mongoose'
import config from '../../../config'
import { Presistence } from '../../../utils/enums'
import { productS } from '../../../api/productService'
import { UserI } from '../../../interfaces/userInterface'
import { CartBaseClass, CartI, CartItemI } from '../../../interfaces/cartInterface'

const CartSchema = new Schema<CartI>(
  {
    userId: { type: String, ref: 'user' },
    products: [
      {
        _id: false,
        product: {
          type: 'ObjectId',
          ref: 'product',
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],
    direccionEntrega: {
      calle: { type: String },
      altura: { type: String },
      cp: { type: String },
      piso: { type: String },
      departamento: { type: String },
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

CartSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export class Cart implements CartBaseClass {
  private srv = `mongodb://localhost:27017/${config.MONGO_DB_NAME}`
  private CartModel: any

  constructor(option: Presistence) {
    if (option == Presistence.MongoDBLocal) {
      this.srv = `mongodb://localhost:27017/${config.MONGO_DB_NAME}`
    } else {
      this.srv = config.MONGO_ATLAS_URI
    }
    mongoose.connect(this.srv)
    this.CartModel = mongoose.model<CartI>('cart', CartSchema)
  }

  async createCart(user: UserI): Promise<CartI> {
    return this.CartModel.create({
      userId: user.id,
      products: [],
      direccionEntrega: user.direccion,
    })
  }

  async emptyCart(userId: string): Promise<CartI> {
    return this.CartModel.findOneAndUpdate(
      {
        userId,
      },
      {
        products: [],
      }
    )
  }

  async getCart(userId: string): Promise<CartI> {
    return this.CartModel.findOne({ userId }, { __v: 0 }).populate(
      'products.product',
      'nombre descripcion precio fotos id'
    )
  }

  async addProductToCart(userId: string, product: CartItemI): Promise<any> {
    const cart = await this.CartModel.findOne({ userId: userId })
    if (!cart) throw new Error('Cart not found')
    const index = cart.products.findIndex((aProduct: any) => aProduct.product == product.product)
    if (index < 0) cart.products.push(product)
    else cart.products[index].qty += product.qty
    await productS.updateStockProduct(product.product.toString(), -product.qty)
    return cart.save()
  }

  async deleteProductFromCart(userId: string, product: CartItemI): Promise<any> {
    const cart = await this.CartModel.findOne({ userId: userId })
    if (!cart) throw new Error('Cart not found')
    const index = cart.products.findIndex((aProduct: any) => aProduct.product == product.product)
    if (index < 0) throw new Error('Product not found in cart')
    if (cart.products[index].qty < product.qty) throw new Error('Product not enough')
    else if (cart.products[index].qty == product.qty) cart.products.splice(index, 1)
    else cart.products[index].qty -= product.qty
    await productS.updateStockProduct(product.product.toString(), product.qty)
    return cart.save()
  }

  async deleteProductFromAllCarts(productId: string): Promise<void> {
    return this.CartModel.updateMany(
      { products: { $elemMatch: { product: productId } } },
      { $pull: { products: { product: productId } } }
    )
  }
}
