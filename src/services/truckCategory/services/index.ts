import { db } from '../../../utils/db.server';

export default class TruckCategoryService {
  static async getAll() {
    return await db.truckCategory.findMany();
  }

  // Digər biznes məntiqi
}