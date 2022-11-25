import { Router } from "express";
import { registerValidation } from "../middlewares/registerValidate.middleware.js";
import { register } from "../controllers/register.controller.js";

const router = Router();

router.post("/register", registerValidation, register);
/* router.post(); */

export default router;