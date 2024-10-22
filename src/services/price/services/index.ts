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
    let extraPrice = 0;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
      params: {
        origin: `place_id:${origin}`,
        destination: `place_id:${destination}`,
        key: "AIzaSyD9JBkYu-uZAPoojnbSD_6ZNUm_SGkmpO4",
      },
    });

    const start_location = response.data.routes[0].legs[0].start_location;
    const end_location = response.data.routes[0].legs[0].end_location;
    let direction;
    if (start_location.lat > end_location.lat) {
      if (start_location.lat > end_location.lng) {
        direction = 2;
      } else {
        direction = 3;
      }
    } else {
      if (start_location.lng > end_location.lng) {
        direction = 1;
      } else {
        direction = 4;
      }
    }
    const steps = response.data.routes[0].legs[0].steps;
    const isDirectionMatch = [
      (element: { start_location: { lat: number, lng: number }, end_location: { lat: number, lng: number } }, location: { startLat: number, startLng: number, endLat: number, endLng: number }) => {
        return location.startLng <= element.start_location.lng
          && location.endLng >= element.end_location.lng
          && location.startLat >= element.start_location.lat
          && location.endLat <= element.end_location.lat;
      },
      (element: { start_location: { lat: number, lng: number }, end_location: { lat: number, lng: number } }, location: { startLat: number, startLng: number, endLat: number, endLng: number }) => {
        return location.startLng <= element.start_location.lng
          && location.endLng >= element.end_location.lng
          && location.startLat <= element.start_location.lat
          && location.endLat >= element.end_location.lat;
      },
      (element: { start_location: { lat: number, lng: number }, end_location: { lat: number, lng: number } }, location: { startLat: number, startLng: number, endLat: number, endLng: number }) => {
        return location.startLng >= element.start_location.lng
          && location.endLng <= element.end_location.lng
          && location.startLat <= element.start_location.lat
          && location.endLat >= element.end_location.lat;
      },
      (element: { start_location: { lat: number, lng: number }, end_location: { lat: number, lng: number } }, location: { startLat: number, startLng: number, endLat: number, endLng: number }) => {
        return location.startLng >= element.start_location.lng
          && location.endLng <= element.end_location.lng
          && location.startLat >= element.start_location.lat
          && location.endLat <= element.end_location.lat;
      },
    ];
    const locations = await db.location.findMany();
    steps.forEach((element: {
      start_location: {
        lat: number; lng: number
      }, end_location: {
        lat: number; lng: number
      }
    }, index: number) => {
      let direction;
      if (element.start_location.lat > element.end_location.lat) {
        if (element.start_location.lat > element.end_location.lng) {
          direction = 2;
        } else {
          direction = 3;
        }
      } else {
        if (element.start_location.lng > element.end_location.lng) {
          direction = 1;
        } else {
          direction = 4;
        }
      }
      locations.map((location: any) => {
      if (location.direction == direction && isDirectionMatch[location.direction - 1](element, location)) {
        extraPrice = location.maxDistance * location.price;
      }
    });
    });

    return extraPrice;
  }
}
