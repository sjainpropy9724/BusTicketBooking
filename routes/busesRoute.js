const router = require('express').Router();
const Bus = require("../models/busModel");

// add-bus

router.post('/add-bus', async(req, res) => {
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

module.exports = router;