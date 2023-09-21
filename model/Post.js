const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true,
        minlength: 6,
    },
    description: {
        type: String,
        require: true,
        minlength: 6,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        reuire: true,
        ref: "User"
    },
    thumNail: {
        type: String,
        default: null
    }

}, { timestamps: true });
module.exports = mongoose.model("Post", postSchema);