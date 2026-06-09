const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ FIX 1: ENV VARIABLE use karo
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// schema
const Bike = mongoose.model("Bike", new mongoose.Schema({}, { strict: false }));

// routes
app.post("/api/bikes", async (req, res) => {
  try {
    const bike = new Bike(req.body);
    await bike.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/bikes", async (req, res) => {
  try {
    const bikes = await Bike.find().sort({ _id: -1 });
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/bikes/:id", async (req, res) => {
  try {
    await Bike.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ FIX 2: Railway PORT use karo
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
// redeploy 123