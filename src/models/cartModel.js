import Joi from "joi";

export const insertInCartModel = Joi.object({
    productName: Joi.string().required(),
    quantity: Joi.number().required()
});