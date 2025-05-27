require("dotenv").config();

const express = require("express");
const connectDB = require("./config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/petugas", require("./routes/petugas"));
app.use("/api/barang", require("./routes/barang"));
app.use("/api/inventaris", require("./routes/inventaris"));
app.use("/api/peminjaman", require("./routes/peminjaman"));
app.use("/api/auth", require("./routes/auth"));
app.get("/api/health", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ message: "MongoDB is connected" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "MongoDB connection error", error: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
