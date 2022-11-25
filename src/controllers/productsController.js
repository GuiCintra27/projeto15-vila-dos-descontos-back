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

export async function getProducts(req, res){
    try{
        const productsList = await products.find().toArray();
        return res.status(200).send(productsList);
    }catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}