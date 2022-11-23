import { insertProductsModel } from "../models/productsModel.js";

export async function productsValidation(req, res, next) {
    const { error } = insertProductsModel.validate(req.body, { abortEarly: false })

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    next();
}