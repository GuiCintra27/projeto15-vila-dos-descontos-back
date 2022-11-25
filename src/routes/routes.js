import { Router } from "express";
import { loginValidation, registerValidation } from "../middlewares/loginValidate.middleware.js";
import { signIn, signUp } from "../controllers/login.controller.js";

const router = Router();

router.post("/sign-up", registerValidation, signUp);
router.post("/sign-in", loginValidation, signIn);

export default router;