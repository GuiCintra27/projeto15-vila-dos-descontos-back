import { users } from "../database/db.js";

export async function checkOut(req, res){

    const user = req.user;

    try{

        const userProducts = await users.findOne({
            _id: user._id
        });



    } catch (err) {

        console.log(err);
        return res.sendStatus(500);

    }


}