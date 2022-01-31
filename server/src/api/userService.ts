import { UserFactoryDAO } from '../models/user/userFactory'
import { NewUserI, UpdateUserI, UserI } from '../interfaces/userInterface'
import config from '../config'

class UserService {
  private user

  constructor() {
    this.user = UserFactoryDAO.get(config.DB_TYPE)
  }

  async createUser(user: NewUserI): Promise<UserI> {
    return this.user.create(user)
  }

  async getUser(email: string): Promise<UserI> {
    return this.user.getByEmail(email)
  }

  async getUserById(id: string): Promise<UserI> {
    return this.user.getById(id)
  }

  async updateUser(id: string, user: UpdateUserI): Promise<UserI> {
    return this.user.update(id, user)
  }

  async deleteUser(id: string): Promise<UserI> {
    return this.user.delete(id)
  }

  async isValidPassword(user: UserI, password: string): Promise<boolean> {
    return this.user.isValidPassword(user, password)
  }
}

export const userS = new UserService()
