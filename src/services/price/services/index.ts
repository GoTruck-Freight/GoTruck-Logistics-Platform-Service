import { db } from '../../../utils/db.server';

interface PriceParams {
    distance: number;
    weight: number;
    truckCategoryId: number;
  }

export default class PriceService {

    static async getAll() {
        return await db.pricing.findMany();
    }

    static async create (basePrice: number, distance: number, weight: number, truckId: number) {
        return await db.pricing.create({
          data: {
            basePrice,
            distance,
            weight,
            truckId,
          },
        });
    }
    static async update (id: number, basePrice:number, distance: number, weight: number, truckId: number) {
        return await db.pricing.update({
          where: {
            id
          },
          data: {
            basePrice,
            distance,
            weight,
            truckId
          },
        });
    }
    static async delete (id: number) {
        return await db.pricing.delete({
          where: {
            id,
          },
        });
    }


    static async calculatePrice(params: PriceParams){
        const { distance, weight, truckCategoryId } = params;
  
        const pricing = await db.pricing.findFirst({
          where: {
            truckId: truckCategoryId
          },
        });
      
        if (!pricing) {
          throw new Error('Uyğun qiymət tapılmadı.');
        }
      
        const totalPrice = pricing.basePrice + ((pricing.distance)/1000 * distance);
      
        return Math.round(totalPrice / 5) * 5;
    }
}
