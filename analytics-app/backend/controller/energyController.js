const EnergyData = require("../models/EnergyData");

const getEnergyData = async (req, res) => {
    try {
        const data = await EnergyData.find().sort({ createdAt: 1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { getEnergyData };
