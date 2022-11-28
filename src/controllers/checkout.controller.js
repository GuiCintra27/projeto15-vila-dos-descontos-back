import { users, sessions, userBuy } from "../database/db.js";

export async function checkOut(req, res){

    const user = req.body;
    console.log(user.product);

    try{
        const compraConcluida = [{
            name: user.name,
            token: user.TOKEN,
            products: user.product
            
        }]
        await userBuy.insertOne(compraConcluida);
        const session = await sessions.findOne({token: user.TOKEN});
        const userInt = await users.findOne({_id: session.userId});
        const userUpdate = await users.updateOne({ email: userInt.email }, {
            $set:
            {
                address: [
                    ...userInt.address,
                    {
                        street: user.street,
                        hNumber: user.hNumber,
                        thing: user.thing,
                        neighborhood: user.neighborhood,
                        city: user.city,
                        state: user.state,
                        cep: user.cep,
                    }
                ]
            }
        });

        return res.send({message: "Compra efetuada com sucesso!"})

    } catch (err) {

        console.log(err);
        return res.sendStatus(500);

    }

}