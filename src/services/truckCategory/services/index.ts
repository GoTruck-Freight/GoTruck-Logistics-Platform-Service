import prisma from '../../../prisma/client';

export default class TruckCategoryService {
  static async getAll() {
    return await prisma.truckCategory.findMany();
  }

  // Digər biznes məntiqi
}