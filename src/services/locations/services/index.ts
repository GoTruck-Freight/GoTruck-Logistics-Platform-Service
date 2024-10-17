import { db } from '../../../utils/db.server';

interface LocationCreateInput {
  name: string;
  price: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  direction: number;
  maxDistance: number;
}

export const locationService = {
  async createLocation(data: LocationCreateInput) {
    return await db.location.create({ data: data });
  },

  async getAllLocations() {
    return await db.location.findMany();
  },

  async getLocationById(id: number) {
    return await db.location.findUnique({
      where: { id }
    });
  },

  async updateLocation(id: number, data: Partial<{
    maxDistance: number,
    price: number,
    startLat: number,
    startLng: number,
    endLat: number,
    endLng: number,
    direction: number
  }>) {
    return await db.location.update({
      where: { id },
      data
    });
  },

  async deleteLocation(id: number) {
    console.log(id);
    return await db.location.delete({
      where: { id:id } 
    });
  }
};