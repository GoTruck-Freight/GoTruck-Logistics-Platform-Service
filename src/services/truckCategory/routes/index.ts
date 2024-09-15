import { Router } from 'express';
import TruckCategoryController from '../controller';

const router = Router();

router.get('/all', TruckCategoryController.getAllCategories);
router.post('/add', TruckCategoryController.createCategory);
router.put('/update/:id', TruckCategoryController.updateCategory);
router.delete('/delete/:id', TruckCategoryController.deleteCategory);

export default router;