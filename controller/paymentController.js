const Payment = require("../model/Payment");

const paymentController = {
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
    }

}
module.exports = paymentController;