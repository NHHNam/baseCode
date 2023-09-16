const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    cardId: {
        type: String,
        require: true,
        unique: true
    },
    fullName: {
        type: String,
        require: true,
        minlength: 6
    },
    nameCard: {
        type: String,
        require: true,
        minlength: 3
    }

}, { timestamps: true });
module.exports = mongoose.model("Payment", paymentSchema);