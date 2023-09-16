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
    }

}, { timestamps: true });
module.exports = mongoose.model("Post", postSchema);