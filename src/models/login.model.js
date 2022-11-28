import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(1).required(),
    type: Joi.string().min(1).required()
});

export const loginSchema = Joi.object({
    email: Joi.string().min(3).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(3).required()
});