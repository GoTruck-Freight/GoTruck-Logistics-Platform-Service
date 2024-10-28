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

  static async create(basePrice: number, distance: number, weight: number, truckId: number, elevationFactor: number) {
    return await db.pricing.create({
      data: {
        basePrice,
        distance,
        weight,
        truckId,
        elevationFactor,
      },
    });
  }

  static async update(id: number, basePrice: number, distance: number, weight: number, truckId: number, elevationFactor: number) {
    return await db.pricing.update({
      where: { id },
      data: {
        basePrice,
        distance,
        weight,
        truckId,
        elevationFactor,
      },
    });
  }

  static async delete(id: number) {
    return await db.pricing.delete({
      where: { id },
    });
  }

  static async calculatePrice(params: PriceParams) {
    const { distance, weight, truckCategoryId, origin, destination } = params;

    const pricing = await db.pricing.findFirst({
      where: { truckId: truckCategoryId },
    });

    if (!pricing) {
      throw new Error('Uyğun qiymət tapılmadı.');
    }

    const extraPrice = await this.calculateExtraPrice(origin, destination, truckCategoryId);
    const totalPrice = pricing.basePrice + ((pricing.distance / 1000) * distance) + extraPrice;

    return Math.round(totalPrice / 5) * 5;
  }

  static async getCoordinatesFromPlaceId(placeId: string): Promise<string> {
    const apiKey = "AIzaSyD9JBkYu-uZAPoojnbSD_6ZNUm_SGkmpO4";
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: { place_id: placeId, key: apiKey }
    });
    const location = response.data.results[0].geometry.location;
    return `${location.lat},${location.lng}`;
  }

  static async calculateExtraPrice(origin: string, destination: string, truckCategoryId: number): Promise<number> {
    let extraPrice = 0;
    let maxElevationDifference = 0;

    const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
      params: {
        origin: `place_id:${origin}`,
        destination: `place_id:${destination}`,
        key: "AIzaSyD9JBkYu-uZAPoojnbSD_6ZNUm_SGkmpO4",
      },
    });

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

    const locations = await db.location.findMany({
      where: { truckId: truckCategoryId }
    });

    for (const step of steps) {
        const startLocation = `${step.start_location.lat},${step.start_location.lng}`;
        const endLocation = `${step.end_location.lat},${step.end_location.lng}`;

        const startElevation = await this.getElevation(startLocation);
        const endElevation = await this.getElevation(endLocation);
        const elevationDifference = Math.abs(endElevation - startElevation);

        maxElevationDifference = Math.max(maxElevationDifference, elevationDifference);

        let direction;
        if (step.start_location.lat > step.end_location.lat) {
          direction = step.start_location.lng > step.end_location.lng ? 2 : 3;
        } else {
          direction = step.start_location.lng > step.end_location.lng ? 1 : 4;
        }

        locations.forEach((location) => {
          if (location.direction === direction && isDirectionMatch[location.direction - 1](step, location)) {
            extraPrice += location.maxDistance * location.price;
          }
        });
    }

    const pricing = await db.pricing.findFirst({ where: { truckId: truckCategoryId } });
    const elevationExtraCost = maxElevationDifference * (pricing?.elevationFactor ?? 0);
    console.log("this: "+elevationExtraCost);
    console.log("this: ex"+extraPrice);
    return extraPrice + elevationExtraCost;
  }

  static async getElevationDifference(originPlaceId: string, destinationPlaceId: string): Promise<number> {
    const apiKey = "AIzaSyD9JBkYu-uZAPoojnbSD_6ZNUm_SGkmpO4";
    const originCoords = await this.getCoordinatesFromPlaceId(originPlaceId);
    const destinationCoords = await this.getCoordinatesFromPlaceId(destinationPlaceId);

    const originElevationResponse = await axios.get(`https://maps.googleapis.com/maps/api/elevation/json`, {
      params: { locations: originCoords, key: apiKey }
    });
    const originElevation = originElevationResponse.data.results[0].elevation;

    const destinationElevationResponse = await axios.get(`https://maps.googleapis.com/maps/api/elevation/json`, {
      params: { locations: destinationCoords, key: apiKey }
    });
    const destinationElevation = destinationElevationResponse.data.results[0].elevation;

    return Math.abs(destinationElevation - originElevation);
  }

  static async getElevation(location: string): Promise<number> {
    const apiKey = "AIzaSyD9JBkYu-uZAPoojnbSD_6ZNUm_SGkmpO4";
    const response = await axios.get(`https://maps.googleapis.com/maps/api/elevation/json`, {
      params: { locations: location, key: apiKey }
    });
    return response.data.results[0]?.elevation || 0;
  }
}
