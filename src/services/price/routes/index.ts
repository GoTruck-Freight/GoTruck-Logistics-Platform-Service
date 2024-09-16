import { Router } from 'express';
import PriceController from '../controller';

const router = Router();

router.get('/all', PriceController.getAllPrices);
router.post('/add', PriceController.createPrice);
router.post('/calculate', PriceController.calculatePrice);
router.put('/update/:id', PriceController.updatePrice);
router.delete('/delete/:id', PriceController.deletePrice);

export default router;