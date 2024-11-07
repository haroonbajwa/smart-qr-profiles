// backend/controllers/qrController.js
const QrCode = require("../models/QrCode");
const QRCode = require("qrcode");

// Create QR code
exports.createQrCode = async (req, res) => {
  const { data } = req.body;
  try {
    const url = `${process.env.BASE_URL}/profile/${Date.now()}`; // Unique URL for each QR
    const qr = await QRCode.toDataURL(url); // Generate QR image URL
    const newQr = await QrCode.create({ data, url });
    res.json({ ...newQr._doc, qr });
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
