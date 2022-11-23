import { products } from "../database/db.js";

export async function insertProduct(req, res) {
    const {name, value, quantity, image} = req.body;

    try{
        await products.insertOne({name, value, quantity, image});
    }catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    return res.sendStatus(201);
}