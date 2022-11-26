import { sessions, users } from "../database/db.js";

export async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const session = await sessions.findOne({ token });

        if (!session) {
            return res.sendStatus(404);
        }

        const user = await users.findOne({ _id: session.userId });

        if (!user) {
            return res.sendStatus(404);
        }

        req.user = user;
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    req.token = token;

    next();
}