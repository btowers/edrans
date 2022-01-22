import { Presistence } from '../../utils/enums';
import { Cart } from './DAOs/mongo';

/**
 * @class Presistence
 */
export class CartFactoryDAO {
  /**
   * @description Get the presistence
   * @param {Persistence} option
   * @return {Cart}
   */
  static get(option: Presistence): Cart {
    switch (option) {
      case Presistence.MongoDBLocal:
        return new Cart(Presistence.MongoDBLocal);
      case Presistence.MongoDBSaaS:
        return new Cart(Presistence.MongoDBSaaS);
      default:
        return new Cart(Presistence.MongoDBLocal);
    }
  }
}
