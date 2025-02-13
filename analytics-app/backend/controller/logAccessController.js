const AccessLog = require("../models/accessLogSchema");
const EnergyData = require("../models/EnergyData");

const logAccessAndGetData = async (req, res) => {
    const { access_time, access_date, employee_name, algo_status } = req.query;
    console.log(access_time, access_date, employee_name, algo_status);

    try {
        // Log the access data
        const newLog = new AccessLog({
            access_time,
            access_date,
            employee_name,
            algo_status,
        });
        await newLog.save();

        // Filter data based on algo_status
        const filteredData = await EnergyData.find({ algo_status }).sort({ createdAt: 1 });

        // Return the filtered data
        res.json({ data: filteredData, log: newLog });
    } catch (error) {
        console.error("Error logging access and fetching data:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { logAccessAndGetData };
