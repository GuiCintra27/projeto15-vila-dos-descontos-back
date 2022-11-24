import { products } from "../database/db.js";
import { insertInCartModel } from "../models/cartModel.js";

export async function cartValidation(req, res, next) {
    const {productName, quantity} = req.body;

    const { error } = insertInCartModel.validate(req.body, { abortEarly: false })

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try{
        const productToCart = await products.findOne({name: productName});

        console.log(productToCart)

        if(!productToCart){
            return res.sendStatus(404);
        }

        const productQuantity= productToCart.quantity;

        if(quantity > productQuantity){
            return res.sendStatus(422);
        }

        req.product = productToCart;
    }catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    next();
}