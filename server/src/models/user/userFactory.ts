import { Presistence } from '../../utils/enums';
import { User } from './DAOs/mongo';

/**
 * @class Presistence
 */
export class UserFactoryDAO {
  /**
   * @description Get the presistence
   * @param {Persistence} option
   * @return {User}
   */
  static get(option: Presistence): User {
    switch (option) {
      case Presistence.MongoDBLocal:
        return new User(Presistence.MongoDBLocal);
      case Presistence.MongoDBSaaS:
        return new User(Presistence.MongoDBSaaS);
      default:
        return new User(Presistence.MongoDBLocal);
    }
  }
}
