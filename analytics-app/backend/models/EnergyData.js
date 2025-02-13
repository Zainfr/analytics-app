const mongoose = require("mongoose");

const EnergyDataSchema = new mongoose.Schema({
    createdAt: { type: Date, required: true },
    total_kwh: { type: Number, required: true },
    serial_no: String,
    algo_status: Number,
});

const EnergyData = mongoose.model("EnergyData", EnergyDataSchema);
module.exports = EnergyData;