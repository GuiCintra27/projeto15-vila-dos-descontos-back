import { users, sessions } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from 'uuid';


export async function signUp(req, res) {
    const user = req.body;
    console.log(user);

    try {

        const hashPassword = bcrypt.hashSync(user.password, 10);
        await users.insertOne({ ...user, password: hashPassword, address: [{}]});
        res.send("OK");

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
        const searchUser = {
            token: token,
            userId: searchName._id,
        }
        await sessions.insertOne(searchUser);
        const user = {
            searchName,
            searchUser
        }
        console.log(user.searchUser)


        res.status(200).send(user);

    } catch (err) {

        console.log(err);
        res.sendStatus(500);

    }

}