import { Presistence } from '../../utils/enums'
import { Product } from './DAOs/mongo'

export class ProductFactoryDAO {
    static get(option: Presistence): Product {
        switch (option) {
            case Presistence.MongoDBLocal:
                return new Product(Presistence.MongoDBLocal)
            case Presistence.MongoDBSaaS:
                return new Product(Presistence.MongoDBSaaS)
            default:
                return new Product(Presistence.MongoDBLocal)
        }
    }
}
