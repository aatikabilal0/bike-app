const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/bikesHub")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const Bike = mongoose.model("Bike", new mongoose.Schema({}, { strict: false }));

app.post("/api/bikes", async (req, res) => {
const bike = new Bike(req.body);
await bike.save();
res.json({ success: true });
});

app.get("/api/bikes", async (req, res) => {
const bikes = await Bike.find().sort({ _id: -1 });
res.json(bikes);
});

app.delete("/api/bikes/:id", async (req, res) => {
await Bike.findByIdAndDelete(req.params.id);
res.json({ success: true });
});

app.listen(5000, () => console.log("Server running"));
