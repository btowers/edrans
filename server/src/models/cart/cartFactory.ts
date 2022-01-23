import { Presistence } from '../../utils/enums'
import { Cart } from './DAOs/mongo'

export class CartFactoryDAO {
    static get(option: Presistence): Cart {
        switch (option) {
            case Presistence.MongoDBLocal:
                return new Cart(Presistence.MongoDBLocal)
            case Presistence.MongoDBSaaS:
                return new Cart(Presistence.MongoDBSaaS)
            default:
                return new Cart(Presistence.MongoDBLocal)
        }
    }
}
