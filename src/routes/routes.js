import { Router } from "express";
import cartRouter from "./cartRouter.js";
import productsRouter from "./productsRouter.js";
import { loginValidation, registerValidation } from "../middlewares/loginValidate.middleware.js";
import { signIn, signUp } from "../controllers/login.controller.js";
import { checkOut } from "../controllers/checkout.controller.js";

const router = Router();

router.post("/sign-up", registerValidation, signUp);
router.post("/sign-in", loginValidation, signIn);
router.post("/checkout", checkOut);
router.use(productsRouter);
router.use(cartRouter);

export default router;