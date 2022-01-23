import { Presistence } from '../../utils/enums'
import { Order } from './DAOs/mongo'

export class OrderFactoryDAO {
    static get(option: Presistence): Order {
        switch (option) {
            case Presistence.MongoDBLocal:
                return new Order(Presistence.MongoDBLocal)
            case Presistence.MongoDBSaaS:
                return new Order(Presistence.MongoDBSaaS)
            default:
                return new Order(Presistence.MongoDBLocal)
        }
    }
}
