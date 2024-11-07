const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const qrRoutes = require("./routes/qrRoutes");
require("dotenv").config();

const app = express();

// Connect to the database
connectDB()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use("/qr", qrRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
