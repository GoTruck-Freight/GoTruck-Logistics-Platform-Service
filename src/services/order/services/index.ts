import { db } from '../../../utils/db.server';

export default class OrderService {
    static async createOrder(order: any): Promise<any> {
        return await db.order.create({
            data: order
        })
    }
}