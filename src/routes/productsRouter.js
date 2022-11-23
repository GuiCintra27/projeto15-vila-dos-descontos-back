import { Router } from "express";
import { productsValidation } from "../middlewares/productsValidation";

const productsRouter = Router();

productsRouter.post('/products', productsValidation);

export default productsRouter;