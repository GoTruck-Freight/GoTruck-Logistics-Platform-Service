import { Router } from 'express';
import { createLocation, getAllLocations, getLocationById, updateLocation, deleteLocation } from '../controller';

const router = Router();

// Bütün location-ları gətirmək
router.get('/', getAllLocations);

// Yeni location yaratmaq
router.post('/', createLocation);

// ID-yə görə location-u gətirmək
router.get('/:id', getLocationById);

// Location-u yeniləmək
router.put('/:id', updateLocation);

router.delete('/:id', deleteLocation);

export default router;