import { Request, Response } from "express";
import OrderService from "../services";


export default class OrderController {
    static async createOrder (req: Request, res: Response){
        const order = req.body;
        const newOrder = await OrderService.createOrder(order);
        res.json(newOrder);
    }
}