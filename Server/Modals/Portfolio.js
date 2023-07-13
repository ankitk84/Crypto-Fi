const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true
        },
        percentChangeToday: {
            type: Number
        },
        percentChangeOverall: {
            type: Number
        },
        walletBalance: {
            type: Number,
            default:50000
        },
        Positions: [{
            assetName: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            invested: {
                type: Number,
                required: true
            }
        }
        ]
    }
)

module.exports = mongoose.model("Portfolio", portfolioSchema);