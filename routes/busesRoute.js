const router = require('express').Router();
const Bus = require("../models/busModel");
const authMiddleware = require("../middlewares/authMiddleware");
// add-bus

router.post('/add-bus', authMiddleware, async(req, res) => {
    try {
        const exsistingBus = await Bus.findOne({ number: req.body.number});
        if (exsistingBus) {
            return res.status(200).send({
                success: false,
                message: 'Bus Already Exists',
            })
        }
        const newBus = new Bus(req.body);
        await newBus.save();
        return res.status(200).send({
            success: true,
            message: 'Bus Added Successfully',
        })
    } catch(error) {
        res.status(500).send({success: false, message: error.message});
    }
});

//get-all-buses

router.post('/get-all-buses', authMiddleware, async(req, res) => {
    try {
        const buses = await Bus.find();
        return res.status(200).send({
            success: true,
            message: "Buses fetched successfully",
            data: buses,
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

module.exports = router;