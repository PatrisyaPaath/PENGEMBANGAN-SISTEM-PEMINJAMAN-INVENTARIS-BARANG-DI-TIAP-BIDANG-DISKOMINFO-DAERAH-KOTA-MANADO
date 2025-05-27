const express = require("express");
const router = express.Router();
const peminjamanController = require("../controllers/peminjamanController");
const authenticateToken = require("../middleware/authMiddleware");

// GET all peminjaman
router.get("/", authenticateToken, peminjamanController.getAllPeminjaman);

// POST create a peminjaman
router.post("/", authenticateToken, peminjamanController.createPeminjaman);

// PUT update a peminjaman by ID
router.put("/:id", authenticateToken, peminjamanController.updatePeminjaman);

// DELETE a peminjaman by ID
router.delete("/:id", authenticateToken, peminjamanController.deletePeminjaman);

// Endpoint untuk mendapatkan peminjaman berdasarkan ID
router.get("/:id", authenticateToken, peminjamanController.getPeminjamanById);

router.patch(
  "/:id/kembalikan",
  authenticateToken,
  peminjamanController.kembalikanPeminjaman
);

module.exports = router;
