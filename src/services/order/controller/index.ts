import { Request, Response } from "express";
import OrderService from "../services";
import { OrderStatus } from '@prisma/client';

export default class OrderController {
  // Yeni sifariş yaratmaq
  static async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderData = req.body;
      const newOrder = await OrderService.createOrder(orderData);
      res.status(201).json(newOrder);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Bütün sifarişləri əldə etmək
  static async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // ID üzrə sifarişi əldə etmək
  static async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const orderId = parseInt(req.params.id);
      const order = await OrderService.getOrderById(orderId);
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ error: 'Sifariş tapılmadı' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Sifarişi yeniləmək
  static async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderId = parseInt(req.params.id);
      const updatedData = req.body;
      const updatedOrder = await OrderService.updateOrder(orderId, updatedData);
      res.status(200).json(updatedOrder);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Sifarişi silmək
  static async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderId = parseInt(req.params.id);
      await OrderService.deleteOrder(orderId);
      res.status(200).json({ message: 'Sifariş silindi' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Statusa görə sifarişləri əldə etmək
  static async getOrdersByStatus(req: Request, res: Response): Promise<void> {
    try {
      const statusParam = req.params.status as string;
      // OrderStatus enumundan istifadə edərək statusu yoxlayırıq
      if (!Object.values(OrderStatus).includes(statusParam as OrderStatus)) {
        res.status(400).json({ error: 'Yanlış status dəyəri' });
        return;
      }
      const status = statusParam as OrderStatus;
      const orders = await OrderService.getOrdersByStatus(status);
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getOrdersWithPagination(req: Request, res: Response): Promise<void> {
    try {
      // Sorğudan `page` və `pageSize` parametrlərini alırıq
      const pageParam = req.query.page as string;
      const pageSizeParam = req.query.pageSize as string;

      // Parametrləri tam ədədə çeviririk və yoxlayırıq
      const page = parseInt(pageParam, 10) || 1; // Default dəyər 1
      const pageSize = parseInt(pageSizeParam, 10) || 10; // Default dəyər 10

      if (page < 1 || pageSize < 1) {
        res.status(400).json({ error: 'Səhifə nömrəsi və səhifə ölçüsü 1-dən böyük olmalıdır' });
      }

      const orders = await OrderService.getOrdersWithPagination(page, pageSize);
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}