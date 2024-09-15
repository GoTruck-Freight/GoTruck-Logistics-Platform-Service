import { Router } from 'express';
import TruckCategoryController from '../controller';

const router = Router();

router.get('/categories', TruckCategoryController.getAllCategories);

export default router;