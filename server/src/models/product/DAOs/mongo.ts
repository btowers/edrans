import mongoose, { FilterQuery } from 'mongoose'
import config from '../../../config'
import { Presistence } from '../../../utils/enums'

import Mongoose from 'mongoose'
import {
  NewProductI,
  ProductBaseClass,
  ProductI,
  ProductQuery,
  UpdateProductI,
} from '../../../interfaces/productInterface'

const ProductSchema = new Mongoose.Schema<ProductI>({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
    lowercase: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: { type: Number, default: 0 },
  fotos: { type: [String], default: [] },
})

ProductSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export class Product implements ProductBaseClass {
  private srv = `mongodb://localhost:27017/${config.MONGO_DB_NAME}`
  private ProductModel: any

  constructor(option: Presistence) {
    if (option == Presistence.MongoDBLocal) {
      this.srv = `mongodb://localhost:27017/${config.MONGO_DB_NAME}`
    } else {
      this.srv = config.MONGO_ATLAS_URI
    }
    mongoose.connect(this.srv)
    this.ProductModel = mongoose.model<ProductI>('product', ProductSchema)
  }

  async getProduct(id: string): Promise<ProductI> {
    return this.ProductModel.findById(id)
  }

  async getProducts(options: ProductQuery = {}): Promise<ProductI[]> {
    const query: FilterQuery<ProductI> = {}
    if (options.nombre) query.nombre = options.nombre

    if (options.minPrice && options.maxPrice) {
      query.precio = {
        $gte: options.minPrice,
        $lte: options.maxPrice,
      }
    } else if (options.minPrice) {
      query.precio = { $gte: options.minPrice }
    } else if (options.maxPrice) {
      query.precio = { $lte: options.maxPrice }
    }

    if (options.minStock && options.maxStock) {
      query.stock = {
        $gte: options.minStock,
        $lte: options.maxStock,
      }
    } else if (options.minStock) {
      query.stock = { $gte: options.minStock }
    } else if (options.maxStock) {
      query.stock = { $lte: options.maxStock }
    }

    return this.ProductModel.find(query, { __v: 0 })
  }

  async create(product: NewProductI): Promise<ProductI> {
    return this.ProductModel.create(product)
  }

  async update(id: string, product: UpdateProductI): Promise<ProductI> {
    return this.ProductModel.findByIdAndUpdate(
      id,
      {
        $set: product,
      },
      { new: true, returnNewDocument: true }
    )
  }

  async delete(id: string): Promise<ProductI> {
    return this.ProductModel.findByIdAndRemove(id)
  }

  async updateStockProduct(id: string, qty: number): Promise<ProductI> {
    return this.ProductModel.findByIdAndUpdate(
      id,
      {
        $inc: { stock: qty },
      },
      { new: true, returnNewDocument: true }
    )
  }

  async updateImagesProduct(id: string, filename: string): Promise<ProductI> {
    return this.ProductModel.findByIdAndUpdate(
      id,
      {
        $push: { fotos: filename },
      },
      { new: true, returnNewDocument: true }
    )
  }

  async deleteImageFromProduct(id: string, filename: string): Promise<ProductI> {
    return this.ProductModel.findByIdAndUpdate(id, { $pull: { fotos: filename } })
  }
}
