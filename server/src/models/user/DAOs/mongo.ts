/* eslint-disable no-invalid-this */
import mongoose, { Schema } from 'mongoose'
import config from '../../../config'
import { Presistence } from '../../../utils/enums'

import { NewUserI, UserBaseClass, UserI } from '../../../interfaces/userInterface'

import bcrypt from 'bcryptjs'

const UserSchema = new Schema<UserI>({
  nombre: {
    type: String,
    required: true,
  },
  identificador: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  direccion: {
    calle: { type: String, required: true },
    altura: { type: String, required: true },
    cp: { type: String, required: true },
    piso: { type: String },
    departamento: { type: String },
  },
  admin: { type: Boolean, default: false },
})

UserSchema.pre('save', async function (next) {
  const user = this
  const hash = await bcrypt.hash(user.password, 10)
  this.password = hash
  next()
})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  },
})

export class User implements UserBaseClass {
  private srv = `mongodb://localhost:27017/${config.MONGO_DB_NAME}`
  private UserModel: any

  constructor(option: Presistence) {
    if (option == Presistence.MongoDBLocal) {
      this.srv = `mongodb://localhost:27017/${config.MONGO_DB_NAME}`
    } else {
      this.srv = config.MONGO_ATLAS_URI
    }
    mongoose.connect(this.srv)
    this.UserModel = mongoose.model<UserI>('user', UserSchema)
  }

  async create(user: NewUserI): Promise<UserI> {
    return this.UserModel.create(user)
  }

  async getByEmail(email: string): Promise<UserI> {
    return this.UserModel.findOne({ email: email })
  }

  async getById(id: string): Promise<UserI> {
    return this.UserModel.findById(id)
  }

  async update(id: string, user: UserI): Promise<UserI> {
    return this.UserModel.findByIdAndUpdate({ id }, { $set: { user } }, { new: true })
  }

  async delete(id: string): Promise<UserI> {
    return this.UserModel.findByIdAndDelete({ id })
  }

  async isValidPassword(user: UserI, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password)
  }
}
