// backend/controllers/qrController.js
const { default: mongoose } = require("mongoose");
const QrCode = require("../models/QrCode");
const QRCode = require("qrcode");

// Create QR code
exports.createQrCode = async (req, res) => {
  const { data } = req.body;
  try {
    const customId = new mongoose.Types.ObjectId();
    const url = `${process.env.BASE_URL}/${customId}`; // Unique url for profile
    const qr = await QRCode.toDataURL(url); // Generate QR image URL
    const newQr = await QrCode.create({ _id: customId, data, url, qr });
    res.json({ ...newQr._doc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read QR codes
exports.getQrCodes = async (req, res) => {
  try {
    const qrCodes = await QrCode.find();
    res.json(qrCodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getprofile = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const qrProfile = await QrCode.findById(id);
    res.json(qrProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update QR code
exports.updateQrCode = async (req, res) => {
  try {
    const updatedQr = await QrCode.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedQr);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete QR code
exports.deleteQrCode = async (req, res) => {
  try {
    await QrCode.findByIdAndDelete(req.params.id);
    res.json({ message: "QR code deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
