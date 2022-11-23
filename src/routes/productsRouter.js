import { Router } from "express";
import { insertProduct } from "../controllers/productsController.js";
import { productsValidation } from "../middlewares/productsValidation.js";

const productsRouter = Router();

productsRouter.post('/products', productsValidation, insertProduct);

export default productsRouter;