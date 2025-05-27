const express = require("express");
const router = express.Router();
const petugasController = require("../controllers/petugasController");
const authenticateToken = require("../middleware/authMiddleware");

// GET all petugas
router.get("/", authenticateToken, petugasController.getAllPetugas);

// POST create a petugas
router.post("/", authenticateToken, petugasController.createPetugas);

// PUT update a petugas by ID
router.put("/:id", authenticateToken, petugasController.updatePetugas);

// DELETE a petugas by ID
router.delete("/:id", authenticateToken, petugasController.deletePetugas);

module.exports = router;
