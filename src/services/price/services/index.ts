import axios from 'axios';
import { db } from '../../../utils/db.server';

interface PriceParams {
  distance: number;
  weight: number;
  truckCategoryId: number;
  origin: string;
  destination: string;
}

export default class PriceService {

  static async getAll() {
    return await db.pricing.findMany();
  }

  static async create(basePrice: number, distance: number, weight: number, truckId: number) {
    return await db.pricing.create({
      data: {
        basePrice,
        distance,
        weight,
        truckId,
      },
    });
  }

  static async update(id: number, basePrice: number, distance: number, weight: number, truckId: number) {
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

  static async delete(id: number) {
    return await db.pricing.delete({
      where: {
        id,
      },
    });
  }


  static async calculatePrice(params: PriceParams) {
    const { distance, weight, truckCategoryId, origin, destination } = params;

    console.log(origin, destination);
    const pricing = await db.pricing.findFirst({
      where: {
        truckId: truckCategoryId
      },
    });

    if (!pricing) {
      throw new Error('Uyğun qiymət tapılmadı.');
    }

    const extraPrice = await this.calculateExtraPrice(origin, destination);

    const totalPrice = pricing.basePrice + ((pricing.distance) / 1000 * distance) + extraPrice;

    return Math.round(totalPrice / 5) * 5;
  }


  static async calculateExtraPrice(origin: string, destination: string): Promise<number> {
    console.log(origin + ': ' + destination)
    let extraPrice = 0;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
      params: {
        origin: `place_id:${origin}`,
        destination: `place_id:${destination}`,
        key: "AIzaSyD9JBkYu-uZAPoojnbSD_6ZNUm_SGkmpO4",
      },
    });

    const locations = {
      maxDistance: 200,
      price: 0.6,
      start_location: {
        "lat": 40.139859,
        "lng": 48.724920
      },
      end_location: {
        "lat": 40.194576,
        "lng": 48.595572
      },
      direction: 1
    };
    const steps = response.data.routes[0].legs[0].steps;

    const isDirectionMatch = [
      (element: { start_location: { lat: number, lng: number }, end_location: { lat: number, lng: number } }, locations: any) => {
        return locations.start_location.lng <= element.start_location.lng
          && locations.end_location.lng >= element.end_location.lng
          && locations.start_location.lat >= element.start_location.lat
          && locations.end_location.lat <= element.end_location.lat;
      },
      (element: { start_location: { lat: number, lng: number }, end_location: { lat: number, lng: number } }, locations: any) => {
        return locations.start_location.lng <= element.start_location.lng
          && locations.end_location.lng >= element.end_location.lng
          && locations.start_location.lat <= element.start_location.lat
          && locations.end_location.lat >= element.end_location.lat;
      }
    ];
      steps.forEach((element: {
        start_location: {
          lat: number; lng: number
        }, end_location: {
          lat: number; lng: number
        }
      }, index: number) => {
        if (isDirectionMatch[locations.direction-1](element, locations)) {
          console.log(`Step ${index}: yesssss`);
          extraPrice = 1000;
        }
      });
    // console.log(response.data.routes[0].legs[0]);
    // Implementation goes here

    return extraPrice;
  }
}
