import Order from '../models/order.model.js';
import { Types } from 'mongoose';
export const createOrder = async (data) => {
    try {
        const { userId } = data;
        if (!Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user id format');
        }
        const order = new Order(data);
        await order.save();
    } catch (error) {
        throw error;
    }
};
