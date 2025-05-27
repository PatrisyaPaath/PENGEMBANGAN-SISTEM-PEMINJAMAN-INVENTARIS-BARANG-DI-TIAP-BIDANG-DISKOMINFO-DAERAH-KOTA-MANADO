const Petugas = require("../models/Petugas");
const bcrypt = require("bcryptjs");

// GET all petugas
exports.getAllPetugas = async (req, res) => {
  try {
    const petugas = await Petugas.find().sort({ createdAt: -1 });
    res.json(petugas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create a petugas
exports.createPetugas = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const petugas = new Petugas({ name, email, password });
    const newPetugas = await petugas.save();
    res.status(201).json(newPetugas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update a petugas by ID
exports.updatePetugas = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password) {
      // Hash password if it's being updated
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const updatedPetugas = await Petugas.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedPetugas)
      return res.status(404).json({ message: "Petugas not found" });
    res.json(updatedPetugas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a petugas by ID
exports.deletePetugas = async (req, res) => {
  try {
    const deletedPetugas = await Petugas.findByIdAndDelete(req.params.id);
    if (!deletedPetugas)
      return res.status(404).json({ message: "Petugas not found" });
    res.json({ message: "Petugas deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
