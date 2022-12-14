import Joi from "joi";

export const insertProductsModel = Joi.object({
    name: Joi.string().required(),
    value: Joi.number().positive().required(),
    quantity: Joi.number().required(),
    image: Joi.string().uri().required()
});