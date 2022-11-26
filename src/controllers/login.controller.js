import { registers } from "../database/db.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
    const user = req.body;

    try {

        const hashPassword = bcrypt.hashSync(user.password, 10);
        await registers.insertOne({ ...user, password: hashPassword });

        res.send("OK")

    } catch (err) {

        console.log(err);
        res.sendStatus(500);

    }
}

export async function signIn(req, res) {

    const { email } = req.body;

    try {

        const searchName = await registers.findOne({ email: email });

        res.status(200).send(searchName)

    } catch (err) {

        console.log(err);
        res.sendStatus(500);

    }

}