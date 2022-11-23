import { products } from "../database/db";

export async function insertProduct(req, res) {
    const {name, value} = req.body;

    try{
        await products.insertOne({name, value});
    }catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    return res.sendStatus(201);
}