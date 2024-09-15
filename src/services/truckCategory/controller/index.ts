import { Request, Response } from 'express';
import TruckCategoryService from '../services';

export default class TruckCategoryController {
  static async getAllCategories(req: Request, res: Response) {
    const categories = await TruckCategoryService.getAll();
    res.json(categories);
  }

  static async createCategory(req: Request, res: Response) {
    const { name, weight, imageUrl, capacity, length, width, height } = req.body;
    const category = await TruckCategoryService.create(name, weight, imageUrl, capacity, length, width, height);
    res.json(category);
  }

  static async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    const { name, weight, imageUrl, capacity, length, width, height } = req.body;
    const category = await TruckCategoryService.update(+id, name, weight, imageUrl, capacity, length, width, height);
    res.json(category);
  }
  
  static async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    await TruckCategoryService.delete(+id);
    res.status(204).send();
  }
}