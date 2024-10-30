// src/services/driver/routes/index.ts
import { Router } from 'express';
import DriverController from '../controller';

const driverRouter = Router();

// Yeni sürücü yaratmaq
driverRouter.post('/', DriverController.createDriver);

// Bütün sürücüləri əldə etmək
driverRouter.get('/', DriverController.getAllDrivers);

// ID üzrə sürücünü əldə etmək
driverRouter.get('/:id', DriverController.getDriverById);

// Sürücünü yeniləmək
driverRouter.put('/:id', DriverController.updateDriver);

// Sürücünü silmək
driverRouter.delete('/:id', DriverController.deleteDriver);

export default driverRouter;