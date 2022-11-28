import { users, sessions, userBuy } from "../database/db.js";

export async function checkOut(req, res){

    const {TOKEN} = req.body;
    const user = req.body
    const {name} = req.headers

    try{
        console.log(user)
        const session = await sessions.findOne({token: TOKEN});
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

        const compraConcluida = {
            name,
            token: TOKEN,
            products: user.products
            
        }

        
        await userBuy.insertOne(compraConcluida);

        console.log(userUpdate);

        return res.send("Compra efetuada com sucesso!")

    } catch (err) {

        console.log(err);
        return res.sendStatus(500);

    }

}