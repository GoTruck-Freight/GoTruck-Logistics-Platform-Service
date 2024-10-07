import { Request, Response } from "express";
import PriceService from "../services";

export default class PriceController {

  static async getAllPrices(req: Request, res: Response) {
    const prices = await PriceService.getAll();
    res.json(prices);
  }

  static async createPrice(req: Request, res: Response) {
    const { basePrice, weight, truckCategoryId, distance } = req.body;
    const newPrice = await PriceService.create(basePrice, distance, weight, truckCategoryId);
    res.json(newPrice);
  }

  static async updatePrice(req: Request, res: Response) {
    const { id } = req.params;
    const { basePrice,distance, weight, truckCategoryId } = req.body;
    const updatedPrice = await PriceService.update(+id,basePrice, distance, weight, truckCategoryId);
    res.json(updatedPrice);
  }
  static async deletePrice(req: Request, res: Response) {
    const { id } = req.params;
    await PriceService.delete(+id);
    res.status(204).send();
  }
  static async calculatePrice(req: Request, res: Response) {
    const { distance, weight, truckCategoryId, origin,destination } = req.body;
    const totalPrice = await PriceService.calculatePrice({ distance, weight, truckCategoryId, origin, destination});
    res.json(totalPrice);
  }
}