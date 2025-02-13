require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const energyRoutes = require("./routes/energyRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/energy", energyRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
