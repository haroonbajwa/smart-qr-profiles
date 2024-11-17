// backend/routes/qrRoutes.js
const express = require("express");
const router = express.Router();
const qrController = require("../controllers/qrController");

router.get("/", qrController.getQrCodes);
router.post("/add", qrController.createQrCode);
router.get("/:id/getProfile", qrController.getprofile);
router.put("/:id/update", qrController.updateQrCode);
router.delete("/:id/delete", qrController.deleteQrCode);

module.exports = router;
