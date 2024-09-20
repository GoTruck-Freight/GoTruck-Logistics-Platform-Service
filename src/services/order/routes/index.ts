import { Router } from "express";
import OrderController from "../controller";
const router = Router();

router.post('/add', OrderController.createOrder);

export default router;