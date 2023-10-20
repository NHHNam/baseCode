const Payment = require("../model/Payment");
const PAGE_SIZE = 2;
const logEvent = require("../helper/logEvent");


const paymentController = {
    //Get Page
    getPaymentByPage: async(req, res, page) => {
        try {
            const skip = (page - 1) * PAGE_SIZE;
            const payments = await Payment.find()
                .skip(skip)
                .limit(PAGE_SIZE);
            logEvent(`${req.url}-------${req.method}-------"Get Page Payment Successfully"`);
            res.status(200).json(payments);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Get Page Payment"`);
            res.status(500).json(err)
        }
    },

    //Get All 
    getAllPayment: async(req, res) => {
        try {
            const payments = await Payment.find();
            logEvent(`${req.url}-------${req.method}-------"Get Payment Successfully"`);
            res.status(200).json(payments);

        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Get Payment"`);
            res.status(500).json(err)
        }
    },

    //Add payment
    addPayment: async(req, res) => {
        try {
            const newPayment = await new Payment({
                cardId: req.body.cardId,
                fullName: req.body.fullName,
                nameCard: req.body.nameCard
            });
            const payment = await newPayment.save();
            logEvent(`${req.url}-------${req.method}-------"Add Payment Successfully"`);
            res.status(200).json(payment);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Add Payment"`);
            res.status(500).json(err);
        }
    },

    //Update Payment
    upadtePayment: async(req, res) => {
        try {
            const updatedPayment = await Payment.findByIdAndUpdate(
                req.params.id, {
                    $set: {
                        cardId: req.body.cardID,
                        fullName: req.body.fullName,
                        nameCard: req.body.nameCard
                    }
                }, { new: true }
            );
            if (!updatedPayment) {
                logEvent(`${req.url}-------${req.method}-------"Payment not found"`);
                res.status(200).json(updatedPayment);
                return res.status(404).json("Payment not found");
            } else {
                logEvent(`${req.url}-------${req.method}-------"Update Payment Successfully"`);
                res.status(200).json(updatedPayment);
            }
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Update Payment"`);
            res.status(500).json(err);
        }
    },

    //Delete Payment
    deletePayment: async(req, res) => {
        try {
            const deletedPayment = await Payment.deleteOne({ _id: req.params.id });
            if (deletedPayment.deletedCount === 1) {
                logEvent(`${req.url}-------${req.method}-------"Payment deleted successfully"`);
                res.status(200).json({ message: "Payment deleted successfully" });
            } else {
                ogEvent(`${req.url}-------${req.method}-------"Payment not found"`);
                res.status(404).json({ error: "Payment not found" });
            }
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Delete Payment"`);
            res.status(500).json(err);
        }
    },

    //Search cardID
    searchByCardID: async(req, res) => {
        try {
            const result = await Payment.find({ cardId: req.params.cardId });
            logEvent(`${req.url}-------${req.method}-------"Search Payment By Card ID Successfully"`);
            res.status(200).json(result);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Search Payment By Card ID"`);
            res.status(500).json(err);
        }
    },
    //Search fullname
    searchByFullname: async(req, res) => {
        try {
            const result = await Payment.find({ fullName: req.params.fullName });
            logEvent(`${req.url}-------${req.method}-------"Search Payment By Full Name Successfully"`);
            res.status(200).json(result);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Search Payment By Full Name"`);
            res.status(500).json(err);
        }
    },
    //Search nameCard
    searchByNameCard: async(req, res) => {
        try {
            const result = await Payment.find({ nameCard: req.params.nameCard });
            logEvent(`${req.url}-------${req.method}-------"Search Payment By Name Card Successfully"`);
            res.status(200).json(result);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Search Payment By Name Card"`);
            res.status(500).json(err);
        }
    }

}
module.exports = paymentController;