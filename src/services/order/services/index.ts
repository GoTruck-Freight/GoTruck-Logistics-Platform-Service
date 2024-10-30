import { db } from '../../../utils/db.server';
import { OrderStatus } from '@prisma/client';
export default class OrderService {
    // Yeni sifariş yaratmaq
    static async createOrder(order: any): Promise<any> {
        return await db.order.create({
            data: order
        });
    }

  // Bütün sifarişləri id-yə görə enən sıralama ilə əldə etmək
static async getAllOrders(): Promise<any[]> {
    return await db.order.findMany({
        orderBy: {
            id: 'desc', // Enən sıralama üçün 'desc' istifadə edilir
        },
    });
}

    // ID üzrə sifarişi əldə etmək
    static async getOrderById(orderId: number): Promise<any | null> {
        return await db.order.findUnique({
            where: {
                id: orderId
            }
        });
    }

    // Sifarişi yeniləmək
    static async updateOrder(orderId: number, updatedData: any): Promise<any> {
        return await db.order.update({
            where: {
                id: orderId
            },
            data: updatedData
        });
    }

    // Sifarişi silmək
    static async deleteOrder(orderId: number): Promise<any> {
        return await db.order.delete({
            where: {
                id: orderId
            }
        });
    }
    static async getOrdersByStatus(status: OrderStatus): Promise<any[]> {
        return await db.order.findMany({
            where: {
                status: status
            }
        });
    }

    static async getOrdersWithPagination(page: number, pageSize: number): Promise<any[]> {
        return await db.order.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize
        });
    }
}