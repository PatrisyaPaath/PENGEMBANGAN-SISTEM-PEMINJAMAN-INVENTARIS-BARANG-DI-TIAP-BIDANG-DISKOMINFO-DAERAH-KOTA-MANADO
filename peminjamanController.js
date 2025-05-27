const Peminjaman = require("../models/Peminjaman");
const PeminjamanBarang = require("../models/PeminjamanBarang");
const mongoose = require("mongoose");

// GET all peminjaman
exports.getAllPeminjaman = async (req, res) => {
  try {
    const peminjaman = await Peminjaman.find()
      .populate("barang")
      .sort({ createdAt: -1 });
    // console.log("Peminjaman:", peminjaman); // Debugging
    res.json(peminjaman);
  } catch (error) {
    console.error("Error fetching peminjaman:", error); // Debugging
    res.status(500).json({ message: error.message });
  }
};

// GET peminjaman
exports.getPeminjamanById = async (req, res) => {
  try {
    const peminjaman = await Peminjaman.findById(req.params.id).populate({
      path: "barang.barang", // Populating the barang field inside the barang array
      select: "name", // Select only the 'name' field
    });
    if (!peminjaman) {
      return res.status(404).json({ message: "Peminjaman not found" });
    }
    res.json(peminjaman);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mengonversi ID ke ObjectId dan memastikan jumlah adalah number
const convertToObjectIds = (array) => {
  return array.map((item) => ({
    barang: new mongoose.Types.ObjectId(item.barang), // Konversi ke ObjectId
    jumlah: Number(item.jumlah), // Pastikan jumlah adalah number
  }));
};

// POST create a peminjaman
exports.createPeminjaman = async (req, res) => {
  const { name, instansi, nosurat, tanggungjawab, tujuan, barang } = req.body;

  // console.log("Received data:", req.body); // Debugging

  // Format data barang
  const formattedBarang = convertToObjectIds(barang);
  // console.log("Formatted barang:", formattedBarang); // Debugging

  const peminjaman = new Peminjaman({
    name,
    instansi,
    nosurat,
    tanggungjawab,
    tujuan,
    barang: formattedBarang, // Gunakan barang yang telah diformat
  });

  try {
    const newPeminjaman = await peminjaman.save();
    res.status(201).json(newPeminjaman);
  } catch (error) {
    console.error("Error creating peminjaman:", error); // Debugging
    res.status(400).json({ message: error.message });
  }
};

// PUT update a peminjaman by ID
exports.updatePeminjaman = async (req, res) => {
  const { name, instansi, nosurat, tanggungjawab, tujuan, barang } = req.body;

  // Format data barang jika ada
  const formattedBarang = barang ? convertToObjectIds(barang) : undefined;

  try {
    const updatedPeminjaman = await Peminjaman.findByIdAndUpdate(
      req.params.id,
      {
        name,
        instansi,
        nosurat,
        tanggungjawab,
        tujuan,
        barang: formattedBarang, // Gunakan barang yang telah diformat jika ada
      },
      { new: true }
    );

    if (!updatedPeminjaman)
      return res.status(404).json({ message: "Peminjaman not found" });

    res.json(updatedPeminjaman);
  } catch (error) {
    console.error("Error updating peminjaman:", error); // Debugging
    res.status(400).json({ message: error.message });
  }
};

// DELETE a peminjaman by ID
exports.deletePeminjaman = async (req, res) => {
  try {
    // Hapus semua PeminjamanBarang yang terkait
    await PeminjamanBarang.deleteMany({ peminjamanId: req.params.id });

    const deletedPeminjaman = await Peminjaman.findByIdAndDelete(req.params.id);
    if (!deletedPeminjaman)
      return res.status(404).json({ message: "Peminjaman not found" });

    res.json({ message: "Peminjaman deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Method to update the 'dikembalikan' field and 'status'
exports.kembalikanPeminjaman = async (req, res) => {
  try {
    const peminjaman = await Peminjaman.findById(req.params.id);
    if (!peminjaman) {
      return res.status(404).json({ message: "Peminjaman not found" });
    }

    peminjaman.status = "Dikembalikan"; // Update status
    peminjaman.dikembalikan = new Date(); // Set current date

    await peminjaman.save();
    res.json(peminjaman);
  } catch (error) {
    console.error("Error updating peminjaman:", error); // Debugging
    res.status(400).json({ message: error.message });
  }
};
