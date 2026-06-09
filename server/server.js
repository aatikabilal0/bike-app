const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const Bike = mongoose.model("Bike", new mongoose.Schema({}, { strict: false }));

// ✅ ROOT ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// POST
app.post("/api/bikes", async (req, res) => {
  try {
    const bike = new Bike(req.body);
    await bike.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET
app.get("/api/bikes", async (req, res) => {
  try {
    const bikes = await Bike.find().sort({ _id: -1 });
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/api/bikes/:id", async (req, res) => {
  try {
    await Bike.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PORT FIX (MAIN ISSUE)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
// redeploy 123