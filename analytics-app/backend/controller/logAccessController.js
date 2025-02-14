const AccessLog = require("../models/accessLogSchema");
const EnergyData = require("../models/EnergyData");

const getLogs = async (req, res) => {
    try {
        const logs = await AccessLog.find().sort({ access_time: 1 });
        console.log(logs)
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const logAccessAndGetData = async (req, res) => {
    try {
        const { start_date, end_date, access_time, access_date, employee_name, algo_status } = req.query;
        console.log('Filter params:', { start_date, end_date, algo_status });

        let query = {};

        if (start_date && end_date) {
            const startDateTime = new Date(start_date);
            const endDateTime = new Date(end_date);

            startDateTime.setUTCHours(0, 0, 0, 0);
            endDateTime.setUTCHours(23, 59, 59, 999);

            query.createdAt = {
                $gte: startDateTime,
                $lte: endDateTime
            };
        }

        if (algo_status !== undefined && algo_status !== '') {
            query.algo_status = Number(algo_status);
        }

        console.log('Final query:', JSON.stringify(query, null, 2));


        const data = await EnergyData.find(query)
            .sort({ createdAt: 1 })
            .lean(); // Use lean() for better performance if you don't need Mongoose documents

        // Log the access
        const newLog = new AccessLog({
            access_time,
            access_date,
            employee_name,
            algo_status,
        });
        await newLog.save();

        // Return response
        res.json({
            success: true,
            count: data.length,
            data: data,
            log: newLog
        });

    } catch (error) {
        console.error("Error logging access and fetching data:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = { logAccessAndGetData, getLogs };