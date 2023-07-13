const mongoose = require("mongoose");

const orderBookSchema = new mongoose.Schema(
    {userId: {
        type: String,
        required: true,
    },
        Type: {
            type: String,
            required: true
        },
        assetName: {
            type: String,
            required: true
        },
        time: {
            type: Date
        },
        quantity: {
            type: Number,
            required: true
        },
        rate: {
            type: Number,
            required: true
        },
    }
);

module.exports = mongoose.model("Orderbook", orderBookSchema);