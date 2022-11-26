import { users, sessions } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from 'uuid';


export async function signUp(req, res) {
    const user = req.body;

    try {

        const hashPassword = bcrypt.hashSync(user.password, 10);
        await users.insertOne({ ...user, password: hashPassword });

        res.send("OK")

    } catch (err) {

        console.log(err);
        res.sendStatus(500);

    }
}

export async function signIn(req, res) {

    const { email } = req.body;

    try {

        const token = uuidV4();
        const searchName = await users.findOne({ email: email });
        await sessions.insertOne({
            token,
            userId: searchName._id,
        });
        res.status(200).send(searchName);

    } catch (err) {

        console.log(err);
        res.sendStatus(500);

    }

}