const express = require("express");
const router = express.Router();
const barangController = require("../controllers/barangController");
const authenticateToken = require("../middleware/authMiddleware");

// GET all barang
router.get("/", authenticateToken, barangController.getAllBarang);

// POST create a barang
router.post("/", authenticateToken, barangController.createBarang);

// PUT update a barang by ID
router.put("/:id", authenticateToken, barangController.updateBarang);

// DELETE a barang by ID
router.delete("/:id", authenticateToken, barangController.deleteBarang);

module.exports = router;
