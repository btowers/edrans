import { UserFactoryDAO } from "../models/user/userFactory";
import { NewUserI, UserI } from "../interfaces/userInterface";
import config from "../config";

/**
 * @class UserService
 */
class UserService {
  private user;

  /**
   * @constructor User
   * @param {string} userId
   */
  constructor() {
    this.user = UserFactoryDAO.get(config.DB_TYPE);
  }

  /**
   * @description Add new user
   * @param {NewUserI} user
   * @return {UserI}
   */
  async createUser(user: NewUserI): Promise<UserI> {
    return this.user.create(user);
  }

  /**
   * @description Get user by email
   * @param {string} email
   * @return {UserI}
   */
  async getUser(email: string): Promise<UserI> {
    return this.user.getByEmail(email);
  }

  /**
   * @description Get user by ID
   * @param {string} id
   * @return {UserI}
   */
  async getUserById(id: string): Promise<UserI> {
    return this.user.getById(id);
  }

  /**
   * @description Update user
   * @param {string} id
   * @param {NewUserI} user
   * @return {UserI}
   */
  async updateUser(id: string, user: UserI): Promise<UserI> {
    return this.user.update(id, user);
  }

  /**
   * @description Delete user
   * @param {string} id
   */
  async deleteUser(id: string): Promise<UserI> {
    return this.user.delete(id);
  }

  /**
   * @param {UserI} user
   * @param {string} password
   * @return {boolean}
   */
  async isValidPassword(user: UserI, password: string): Promise<boolean> {
    return this.user.isValidPassword(user, password);
  }
}

export const userS = new UserService();
