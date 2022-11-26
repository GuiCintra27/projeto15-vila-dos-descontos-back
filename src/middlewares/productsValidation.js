import { insertProductsModel } from "../models/productsModel.js";
import { products } from "../database/db.js";

export async function productsValidation(req, res, next) {
    const {name} = req.body;

    const { error } = insertProductsModel.validate(req.body, { abortEarly: false })

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try{
        const alreadyExists = await products.findOne({name});

        if (alreadyExists){
            return res.sendStatus(409);
        }
    }catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    next();
}