import { Router } from "express";
import { getCart, insertInCart } from "../controllers/cartController.js";
import { authValidation } from "../middlewares/authValidation.js";
import { cartValidation } from "../middlewares/cartValidation.js";

const cartRouter = Router();

cartRouter.use(authValidation);

cartRouter.post('/cart', cartValidation, insertInCart);

cartRouter.get('/cart', getCart);

export default cartRouter;