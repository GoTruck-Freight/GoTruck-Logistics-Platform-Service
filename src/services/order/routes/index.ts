import { Router } from 'express';
import OrderController from '../controller';

const router = Router();

// Yeni sifariş yaratmaq
router.post('/', OrderController.createOrder);

// Bütün sifarişləri əldə etmək
router.get('/', OrderController.getAllOrders);

// ID üzrə sifarişi əldə etmək
router.get('/:id', OrderController.getOrderById);

// Sifarişi yeniləmək
router.put('/:id', OrderController.updateOrder);

// Sifarişi silmək
router.delete('/:id', OrderController.deleteOrder);

// Statusa görə sifarişləri əldə etmək
router.get('/status/:status', OrderController.getOrdersByStatus);

// Sifarişləri səhifələmə ilə əldə etmək
router.get('/paginated', OrderController.getOrdersWithPagination);

export default router;