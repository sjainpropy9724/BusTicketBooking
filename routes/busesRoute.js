const router = require("express").Router();
const Bus = require("../models/busModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add-bus

router.post("/add-bus", authMiddleware, async (req, res) => {
  try {
    const exsistingBus = await Bus.findOne({ number: req.body.number });
    if (exsistingBus) {
      return res.status(200).send({
        success: false,
        message: "Bus Already Exists",
      });
    }
    const newBus = new Bus(req.body);
    await newBus.save();
    return res.status(200).send({
      success: true,
      message: "Bus Added Successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// update-bus
router.post("/update-bus", authMiddleware, async (req, res) => {
  try {
    await Bus.findByIdAndUpdate(req.body._id, req.body);
    return res.status(200).send({
      success: true,
      message: "Bus updated successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

//delete-bus
router.post("/delete-bus", authMiddleware, async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.body._id);
    return res.status(200).send({
      success: true,
      message: "Bus deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

//get-all-buses

router.post("/get-all-buses", authMiddleware, async (req, res) => {
  try {
    let query = {};
    if (req.body.from) {
      query.from = { $regex: new RegExp(req.body.from, "i") }; // Case-insensitive
    }
    if (req.body.to) {
      query.to = { $regex: new RegExp(req.body.to, "i") };
    }
    if (req.body.journeyDate) {
      query.journeyDate = req.body.journeyDate;
    }

    const buses = await Bus.find(query);
    return res.status(200).send({
      success: true,
      message: "Buses fetched successfully",
      data: buses,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});


//get-bus-by-id
router.post("/get-bus-by-id", authMiddleware, async (req, res) => {
  try {
    const bus = await Bus.findById(req.body._id);
    return res.status(200).send({
      success: true,
      message: "Bus fetched successfully",
      data: bus,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
