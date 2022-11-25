import { registers } from "../database/db.js";
import bcrypt from "bcrypt";

export async function register(req, res) {
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