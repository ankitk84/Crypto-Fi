const OrderBook = require("../Modals/OrderBook");
const Portfolio = require("../Modals/Portfolio");
const express = require('express')
const Authenticate = require("../middleware/authenticate")
const router = express.Router()

router.post("/sellOrder",Authenticate, async (req, res) => {
    const userId = req.userId;
    const { qty, token, rate } = req.body;
    console.log(qty, token, rate);
    try {
        if (!qty || !token || !rate)
            return res
                .status(400)
                .json({ success: false, message: "Missing Parameters" });
        const user = await Portfolio.findOne({ userId: userId });
        var positions = user.Positions.find((positions) => positions.assetName === token);
        if (!positions) {
            return res
                .status(400)
                .json({ success: false, message: "positions does not exist" });
        }
        if (qty > positions.quantity) {
            return res
                .status(400)
                .json({ success: false, message: "Not enough quantity available" });
        }
        positions.quantity -= qty;
        //   if (qty * rate < 1) {
        //     return res.status(400).send({
        //       success: false,
        //       message: "The minimum deal should be of $1.",
        //     });
        //   }
        const newWalletAmt = Number(user.walletBalance) + Number(qty) * Number(rate);
        console.log(positions);
        if (positions.quantity.toFixed(5) == 0) {
            Portfolio.findOneAndUpdate(
                { userId, "Positions.assetName": token },
                {
                    $pull: {
                        "Positions": {
                            "assetName": token,
                        }
                    },
                    $set: {
                        "walletBalance": newWalletAmt,
                    },

                },
                {
                    new: true
                }
            ).then((data) => {
                console.log(data);
            });
        } else {
            Portfolio.findOneAndUpdate(
                { userId, "Positions.assetName": token },
                {
                    $set: {
                        "Positions.$.quantity": positions.quantity,
                        "Positions.$.invested": positions.invested - qty * rate,
                        "walletBalance": newWalletAmt,
                    },

                },
                {
                    new: true
                }
            ).then((data) => {
                console.log(data);
            });
        }

        OrderBook.create({
            userId,
            Type: "sell",
            assetName: token,
            time: new Date(),
            quantity: qty,
            rate: rate,
        })
        // await contest.save();
        res.status(200).json({ success: true, message: "Order sold successfully" });
    } catch (err) {
        res.status(500).json(err.message);
    }
    //qty*rate add to wallet
    //decrease holdings by qty
});

router.post("/buyOrder",Authenticate, async (req, res) => {
    const userId = req.userId;
    const { qty, token, rate } = req.body;
    console.log(qty, token, rate, userId);
    try {
        if (!qty || !token || !rate)
            return res
                .status(400)
                .json({ success: false, message: "Missing Parameters" });
        const user = await Portfolio.findOne({ userId: userId });
        var positions = user.Positions.find((positions) => positions.assetName === token);
        if (qty * rate > user.walletBalance) {
            return res
                .status(400)
                .json({ success: false, message: "Not enough amount in wallet" });
        }
        const newWalletAmt = Number(user.walletBalance) - (Number(qty) * Number(rate));

        if (!positions) {
            Portfolio.findOneAndUpdate(
                { userId },
                {
                    $push: {
                        "Positions": {
                            "assetName": token,
                            "quantity": qty,
                            "invested": qty * rate,
                        }
                    },
                    $set: {
                        "walletBalance": newWalletAmt,
                    },

                }, {
                upsert: true,
                new: true
            }
            ).then((data) => {
                console.log("New", data);
            });
        }
        else {
            positions.quantity += qty;
            console.log(positions.quantity)
            Portfolio.findOneAndUpdate(
                { userId, "Positions.assetName": token },
                {
                    $set: {
                        "Positions.$.quantity": positions.quantity,
                        "Positions.$.invested": positions.invested + qty * rate,
                        "walletBalance": newWalletAmt,
                    },

                },
                {
                    upsert: true,
                    new: true
                }
            ).then((data) => {
                console.log("Old", data);
            });
        }
        // await contest.save();
        OrderBook.create({
            userId,
            Type: "buy",
            assetName: token,
            time: new Date(),
            quantity: qty,
            rate: rate,
        })
        res
            .status(200)
            .json({ success: true, message: token + " bought successfully" });
    } catch (err) {
        res.status(500).json(err.message);
    }
    //qty*rate add to wallet
    //decrease holdings by qty
});





module.exports = router