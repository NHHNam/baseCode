const Payment = require("../model/Payment");

const paymentController = {

    //Add payment
    addPayment: async(req, res) => {
        try {
            const newPayment = await new Payment({
                cardId: req.body.cardId,
                fullName: req.body.fullName,
                nameCard: req.body.nameCard
            });
            const payment = await newPayment.save();
            res.status(200).json(payment);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Update Payment
    upadtePayment: async(req, res) => {
        try {

            const updatedPayment = await Payment.findByIdAndUpdate(
                req.params.id, {
                    $set: {
                        cardId: req.body.cardId,
                        fullName: req.body.fullName,
                        nameCard: req.body.nameCard
                    }
                }, { new: true }
            );
            if (!updatedPayment) {
                return res.status(404).json("Payment not found");
            }
            res.status(200).json(updatedPayment);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Delete Payment
    deletePayment: async(req, res) => {
        try {
            const deletedPayment = await Payment.deleteOne({ _id: req.params.id });
            if (deletedPayment.deletedCount === 1) {
                res.status(200).json({ message: "Payment deleted successfully" });
            } else {
                res.status(404).json({ error: "Payment not found" });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

}
module.exports = paymentController;