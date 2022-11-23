import { Router } from "express";
import { getProducts, insertProduct } from "../controllers/productsController.js";
import { productsValidation } from "../middlewares/productsValidation.js";

const productsRouter = Router();

productsRouter.post('/products', productsValidation, insertProduct);

productsRouter.get('/products', getProducts);

export default productsRouter;