import Joi from 'joi'

import { ObjectIdValidator } from '../utils/idValidator'

class Validator {
    isValidProduct = (product: object) => {
        const schema = Joi.object({
            product: Joi.custom(ObjectIdValidator).required().messages({
                'product.error': `invalid ObjectId`,
            }),
            qty: Joi.number().min(1).required(),
        })
        return schema.validateAsync(product)
    }

    /**
     * @description Params Validator
     * @param {object} params
     * @return {Promise}
     */
    params = (params: object) => {
        const schema = Joi.object({
            _id: Joi.string().custom(ObjectIdValidator).messages({
                'id.error': `invalid ObjectId`,
            }),
            categoria: Joi.string().min(3).max(50),
        })
        return schema.validateAsync(params)
    }

    query = (query: object) => {
        const schema = Joi.object({
            id: Joi.string().custom(ObjectIdValidator).messages({
                'id.error': `invalid ObjectId`,
            }),
            categoria: Joi.string().max(50),
            nombre: Joi.string().min(3).max(50),
        })
        return schema.validateAsync(query)
    }

    id = (id: string) => {
        const schema = Joi.string().custom(ObjectIdValidator).required().messages({
            'id.error': `invalid ObjectId`,
        })
        return schema.validateAsync(id)
    }
}
export const validatorS = new Validator()
