import User from '../models/user.model.js';
import Payment from '../models/payment.model.js';
import { Error, startSession, Types } from 'mongoose';

export const create = async (userId, field) => {
    try {
        if (!Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid id format');
        }
        const paymentCurrent = await User.findById(userId, 'payment');
        if (!paymentCurrent) {
            throw new Error('User is not found');
        }
        if (paymentCurrent.payment) {
            throw new Error('User already has payment');
        }
        const newPayment = new Payment({ ...field, userId });
        const savePayment = await newPayment.save();

        const paymentId = savePayment._id;

        await User.findByIdAndUpdate(userId, { payment: paymentId });
    } catch (error) {
        console.log(error);
        throw new Error('Cannot user create payment service');
    }
};

export const update = async (userId, field) => {
    try {
        if (!Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid id format');
        }

        const paymentCurrent = await User.findById(userId, 'payment');

        if (!paymentCurrent) {
            throw new Error('User is not found');
        }

        const paymentId = paymentCurrent.payment;
        if (!paymentId) {
            throw new Error('The user does not have a payment');
        }

        await Payment.findByIdAndUpdate(paymentId, field);
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use update payment service');
    }
};

export const atmTransaction = async (paymentFromId, paymentToId, amount) => {
    const session = await startSession();
    session.startTransaction();
    try {
        if (!Types.ObjectId.isValid(paymentFromId) || !Types.ObjectId.isValid(paymentToId)) {
            throw new Error('Invalid id format');
        }
        const paymentFrom = await Payment.findById(paymentFromId);
        const paymentTo = await Payment.findById(paymentToId);

        if (!paymentFrom || !paymentTo) {
            throw new Error('Payment is not found');
        }
        if (paymentFrom.amount < amount) throw new Error('User không đủ tiền để chuyển');

        const amountFrom = await Payment.findByIdAndUpdate(
            paymentFromId,
            {
                $inc: { amount: -amount },
            },
            { session, new: true },
        );

        const amountTo = await Payment.findByIdAndUpdate(
            paymentToId,
            {
                $inc: { amount: amount },
            },
            { session, new: true },
        );
        console.log(amountFrom, amountTo);
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw new Error(error);
    } finally {
        await session.endSession();
    }
};

export const getAll = async (queryParams) => {
    try {
        const { search = null, page = 1 } = queryParams;
        const limit = 5;
        const query = {};
        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { nameCard: { $regex: search, $options: 'i' } },
                { cardId: { $regex: search, $options: 'i' } },
            ];
        }

        const options = {
            limit,
            page,
            populate: {
                path: 'userId',
                model: 'user',
                select: {
                    _id: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    password: 0,
                    payment: 0,
                },
            },
            select: {
                _id: 0,
                createdAt: 0,
                updatedAt: 0,
            },
        };
        const payments = await Payment.paginate(query, options);
        return payments;
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use get all payment service');
    }
};

export const destroy = async (_id) => {
    try {
        if (!Types.ObjectId.isValid(_id)) {
            throw new Error('Invalid id format');
        }
        const payment = await Payment.findById(_id);
        if (!payment) {
            throw new Error('Payment is not found');
        }
        await Payment.findByIdAndDelete(_id);
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use destroy payment service');
    }
};