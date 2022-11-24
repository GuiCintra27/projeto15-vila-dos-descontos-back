import { products, users } from "../database/db.js";

export async function insertInCart(req, res) {
    const { quantity } = req.body;
    const user = req.user;
    const product = req.product;

    try {
        const updateProduct = await products.updateOne({ _id: product._id }, {
            $set: {
                quantity: product.quantity - quantity
            }
        });

        const cartInserted = await users.updateOne({ _id: user._id }, {
            $set:
            {
                cart: [
                    ...user.cart,
                    {
                        name: product.name,
                        value: product.value,
                        quantity,
                        image: product.image
                    }
                ]
            }
        });

        if (cartInserted.modifiedCount === 1 && updateProduct.modifiedCount === 1) {
            return res.sendStatus(200);
        }

        return res.sendStatus(404);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function getCart(req, res) {
    const user = req.user;
    const cart = user.cart;
    
    return res.status(200).send(cart);
}