const express = require("express");
const router = express.Router();
const barangController = require("../controllers/barangController");

// GET all barang
router.get("/", barangController.getAllBarang);

module.exports = router;
