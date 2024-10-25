import { db } from '../../../utils/db.server';

export default class TruckCategoryService {
  static async getAll() {
    return (await db.truckCategory.findMany()).reverse();
  }

  static async create(name: string, weight: number, imageUrl: string, capacity: number, length: number, width: number, height: number) {
    return await db.truckCategory.create({
      data: {
        name,
        weight,
        imageUrl,
        capacity,
        length,
        width,
        height,
      },
    });
  }
  static async update(id: number, name: string, weight: number, imageUrl: string, capacity: number, length: number, width: number, height: number) {
    return await db.truckCategory.update({
      where: {
        id,
      },
      data: {
        name,
        weight,
        imageUrl,
        capacity,
        length,
        width,
        height,
      },
    });
  }
  static async delete(id: number) {
    return await db.truckCategory.delete({
      where: {
        id,
      },
    });
  }
}