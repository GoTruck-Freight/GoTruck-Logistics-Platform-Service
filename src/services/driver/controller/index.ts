// src/services/driver/controller/index.ts
import { Request, Response } from 'express';
import DriverService from '../services';

export default class DriverController {
  // Yeni sürücü yaratmaq
  static async createDriver(req: Request, res: Response): Promise<void> {
    try {
      const driver = await DriverService.createDriver(req.body);
      res.status(201).json(driver);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Bütün sürücüləri əldə etmək
  static async getAllDrivers(req: Request, res: Response): Promise<void> {
    try {
      const drivers = await DriverService.getAllDrivers();
      res.status(200).json(drivers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // ID üzrə sürücünü əldə etmək
  static async getDriverById(req: Request, res: Response): Promise<void> {
    try {
      const driverId = Number(req.params.id);
      const driver = await DriverService.getDriverById(driverId);
      if (!driver) {
        res.status(404).json({ error: 'Driver not found' });
        return;
      }
      res.status(200).json(driver);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Sürücünü yeniləmək
  static async updateDriver(req: Request, res: Response): Promise<void> {
    try {
      const driverId = Number(req.params.id);
      const updatedDriver = await DriverService.updateDriver(driverId, req.body);
      res.status(200).json(updatedDriver);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Sürücünü silmək
  static async deleteDriver(req: Request, res: Response): Promise<void> {
    try {
      const driverId = Number(req.params.id);
      await DriverService.deleteDriver(driverId);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}