import { registerSchema, loginSchema } from "../models/login.model.js"
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

export async function loginValidation(req, res, next){

    const login = req.body;

    const validateLogin = loginSchema.validate(login, {abortEarly: false});
    if(validateLogin.error){
        const vlError = validateLogin.error.details.map(
            (err) => err.message
        );
        return res.status(400).send(vlError);
    }


    const check = await registers.findOne({ email: login.email });
    if (!check) {
        return res.status(404).send({ message: "User is not created" });
    }

    next();

}
