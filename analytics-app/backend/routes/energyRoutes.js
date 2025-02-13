const express = require("express");
const router = express.Router();
const { getEnergyData } = require("../controller/energyController");
const { logAccessAndGetData } = require("../controller/logAccessController");
const { getLogs } = require("../controller/logAccessController");

// Define API routes
router.get("/", getEnergyData);
router.get("/access", logAccessAndGetData);
router.get("/logs", getLogs)

module.exports = router;