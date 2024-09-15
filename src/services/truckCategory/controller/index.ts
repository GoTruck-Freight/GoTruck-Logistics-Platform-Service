import { Request, Response } from 'express';
import TruckCategoryService from '../services';

export default class TruckCategoryController {
  static async getAllCategories(req: Request, res: Response) {
    const categories = await TruckCategoryService.getAll();
    res.json(categories);
  }

  // Digər metodlar
}