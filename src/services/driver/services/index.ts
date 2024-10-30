// src/services/driver/services/index.ts
import { db } from '../../../utils/db.server';

export default class DriverService {
  // Yeni sürücü yaratmaq
  static async createDriver(driverData: any): Promise<any> {
    return await db.driver.create({
      data: driverData,
    });
  }

  // Bütün sürücüləri əldə etmək
  static async getAllDrivers(): Promise<any[]> {
    return await db.driver.findMany();
  }

  // ID üzrə sürücünü əldə etmək
  static async getDriverById(driverId: number): Promise<any | null> {
    return await db.driver.findUnique({
      where: { id: driverId },
    });
  }

  // Sürücünü yeniləmək
  static async updateDriver(driverId: number, updatedData: any): Promise<any> {
    return await db.driver.update({
      where: { id: driverId },
      data: updatedData,
    });
  }

  // Sürücünü silmək
  static async deleteDriver(driverId: number): Promise<any> {
    return await db.driver.delete({
      where: { id: driverId },
    });
  }
}