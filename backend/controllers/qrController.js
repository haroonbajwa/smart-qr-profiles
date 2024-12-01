// backend/controllers/qrController.js
const mongoose = require("mongoose");
const { QRCodeCanvas } = require("@loskir/styled-qr-code-node");
const ModelQrCode = require("../models/QrCode");
const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");

// Create QR code
exports.createQrCode = async (req, res) => {
  const { data } = req.body;
  try {
    const customId = new mongoose.Types.ObjectId();
    const url = `${process.env.BASE_URL}/${customId}`; // Unique url for profile
    // Path to the logo image
    const logoPath = path.join(__dirname, "../static/logo.png");
    // Generate a unique filename
    const uniqueFileName = `qr_${customId}.png`;
    const uploadsFolder = path.join(__dirname, "../uploads");

    // Ensure uploads directory exists
    if (!fs.existsSync(uploadsFolder)) {
      fs.mkdirSync(uploadsFolder, { recursive: true });
    }

    const outputPath = path.join(uploadsFolder, uniqueFileName);

    // Generate the QR code
    const qrCode = new QRCodeCanvas({
      data: url,
      image: logoPath, // Path to the logo
    });

    // Save the QR code to a file
    await qrCode.toFile(outputPath, "png");

    const newQr = await ModelQrCode.create({
      _id: customId,
      data,
      url,
      qr: uniqueFileName,
    });
    res.json(newQr);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read QR codes
exports.getQrCodes = async (req, res) => {
  try {
    const qrCodes = await ModelQrCode.find();
    res.json(qrCodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getprofile = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const qrProfile = await ModelQrCode.findById(id);
    res.json(qrProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update QR code
exports.updateQrCode = async (req, res) => {
  try {
    const updatedQr = await ModelQrCode.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedQr);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete QR code
exports.deleteQrCode = async (req, res) => {
  try {
    await ModelQrCode.findByIdAndDelete(req.params.id);
    res.json({ message: "QR code deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
