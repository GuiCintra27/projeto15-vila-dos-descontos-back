import { registerSchema } from "../models/register.model.js"
import { registers } from "../database/db.js"

export async function registerValidation(req, res, next) {

    const user = req.body;

    const validate = registerSchema.validate(user, {abortEarly: false});
    if(validate.error){
        const vlError = validate.error.details.map(
            (err) => err.message
        );
        return res.status(400).send(vlError);
    }

    const registerCheck = await registers.findOne({ email: user.email })
    if (registerCheck) {
        return res.status(400).send({ message: "Email já cadastrado!" });
    }


    next();
    
}
