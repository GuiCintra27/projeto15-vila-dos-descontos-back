import { Router } from "express";
import { productsValidation } from "../middlewares/productsValidation.js";

const productsRouter = Router();

productsRouter.post('/products', productsValidation);

export default productsRouter;