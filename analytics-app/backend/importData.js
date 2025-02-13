require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const connectDB = require("./config/db");
const EnergyData = require("./models/EnergyData");

connectDB();

const importData = async () => {
    try {
        const rawData = JSON.parse(fs.readFileSync("../public/data.json", "utf-8"));

        const formattedData = rawData.map((data) => ({
            createdAt: data.createdAt?.$date,
            total_kwh: data.total_kwh,
            serialNo: data.serialNo,
            algo_status: data.algo_status
        }));

        await EnergyData.insertMany(formattedData);
        console.log("Data Imported Successfully!");
        process.exit();
    } catch (error) {
        console.error("Error Importing Data:", error);
        process.exit(1);
    }
};

importData();
