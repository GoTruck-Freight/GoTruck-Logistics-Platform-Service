import { db } from '../../../utils/db.server';

export default class TruckCategoryService {
  static async getAll() {
    return await db.truckCategory.findMany();
  }

  static async create(name: string, weight: number, imageUrl: string, capacity: number, length: number, width: number) {
    return await db.truckCategory.create({
      data: {
        name,
        weight,
        imageUrl,
        capacity,
        length,
        width,
      },
    });
  }
}