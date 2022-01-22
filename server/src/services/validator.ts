import Joi from "joi";
import { BodyI } from "../middleware/validator";

import { ObjectIdValidator } from "../utils/idValidator";

/**
 * @class Validator
 */
class Validator {
  /**
   * @description Update Product Validator
   * @param {object} product
   * @return {Promise}
   */
  productToCart = (product: object) => {
    const schema = Joi.object({
      product: Joi.custom(ObjectIdValidator).required().messages({
        "product.error": `invalid ObjectId`,
      }),
      qty: Joi.number().min(1).required(),
    });
    return schema.validateAsync(product);
  };

  /**
   * @description Params Validator
   * @param {object} params
   * @return {Promise}
   */
  params = (params: object) => {
    const schema = Joi.object({
      _id: Joi.string().custom(ObjectIdValidator).messages({
        "id.error": `invalid ObjectId`,
      }),
      categoria: Joi.string().min(3).max(50),
    });
    return schema.validateAsync(params);
  };

  /**
   * @description Query Validator
   * @param {object} query
   * @return {Promise}
   */
  query = (query: object) => {
    const schema = Joi.object({
      id: Joi.string().custom(ObjectIdValidator).messages({
        "id.error": `invalid ObjectId`,
      }),
      categoria: Joi.string().max(50),
      nombre: Joi.string().min(3).max(50),
    });
    return schema.validateAsync(query);
  };

  /**
   * @description ID Validator
   * @param {object} id
   * @return {Promise}
   */
  id = (id: string) => {
    const schema = Joi.string().custom(ObjectIdValidator).required().messages({
      "id.error": `invalid ObjectId`,
    });
    return schema.validateAsync(id);
  };

  /**
   * @description Image Name Validator
   * @param {object} body
   * @return {Promise}
   */
  body = (body: BodyI) => {
    const schema = Joi.object({
      filename: Joi.string().required(),
      product: Joi.string().custom(ObjectIdValidator).required().messages({
        "product.error": `invalid ObjectId`,
      }),
    });
    return schema.validateAsync(body);
  };
}
export const validatorS = new Validator();
