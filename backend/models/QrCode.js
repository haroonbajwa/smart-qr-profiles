// backend/models/QrCode.js
const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  data: { type: String, required: true }, // Information to encode
  url: { type: String, required: true }, // URL to access this QR profile
});

module.exports = mongoose.model("QrCode", qrCodeSchema);
