import mongoose, { Schema } from 'mongoose'
import config from '../../../config'
import { ErrorCode, Presistence } from '../../../utils/enums'
import { productS } from '../../../api/productService'
import { UserI } from '../../../interfaces/userInterface'
import { CartBaseClass, CartI, CartItemI } from '../../../interfaces/cartInterface'

const CartSchema = new Schema<CartI>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'user' },
        products: [
            new Schema(
                {
                    product: {
                        type: Schema.Types.ObjectId,
                        ref: 'product',
                        required: true,
                    },
                    qty: { type: Number, required: true },
                },
                { _id: false }
            ),
        ],
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
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

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
            userId: user._id,
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
            'nombre descripcion precio fotos _id'
        )
    }

    async addProductToCart(userId: string, product: CartItemI): Promise<any> {
        const cart = await this.CartModel.findOne({ userId: userId })
        if (!cart) throw new Error(ErrorCode.CartNotFound)
        const index = cart.products.findIndex(
            (aProduct: any) => aProduct.product == product.product
        )
        if (index < 0) cart.products.push(product)
        else cart.products[index].qty += product.qty
        await productS.updateStockProduct(product.product.toString(), -product.qty)
        return cart.save()
    }

    async deleteProductFromCart(userId: string, product: CartItemI): Promise<any> {
        const cart = await this.CartModel.findOne({ userId: userId })
        if (!cart) throw new Error(ErrorCode.BadRequest)
        const index = cart.products.findIndex(
            (aProduct: any) => aProduct.product == product.product
        )
        if (index < 0) throw new Error(ErrorCode.BadRequest)
        if (cart.products[index].qty < product.qty) {
            throw new Error(ErrorCode.BadRequest)
        } else if (cart.products[index].qty == product.qty) {
            cart.products.splice(index, 1)
        } else {
            cart.products[index].qty -= product.qty
        }
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
