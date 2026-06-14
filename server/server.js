require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const Bike = mongoose.model("Bike", new mongoose.Schema({}, { strict: false }));
const Expense = mongoose.model("Expense", new mongoose.Schema({}, { strict: false }));
const Plate = mongoose.model("Plate", new mongoose.Schema({}, { strict: false }));

app.get("/", (req, res) => res.send("Bikes Hub PK API Running ✅"));

app.get("/api/bikes", async (req, res) => { try { res.json(await Bike.find().sort({ _id: -1 })); } catch (err) { res.status(500).json({ error: err.message }); } });
app.post("/api/bikes", async (req, res) => { try { await new Bike(req.body).save(); res.json({ success: true }); } catch (err) { res.status(500).json({ error: err.message }); } });
app.put("/api/bikes/:id", async (req, res) => { try { await Bike.findByIdAndUpdate(req.params.id, req.body); res.json({ success: true }); } catch (err) { res.status(500).json({ error: err.message }); } });
app.delete("/api/bikes/:id", async (req, res) => { try { await Bike.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (err) { res.status(500).json({ error: err.message }); } });

app.get("/api/expenses", async (req, res) => { try { res.json(await Expense.find().sort({ _id: -1 })); } catch (err) { res.status(500).json({ error: err.message }); } });
app.post("/api/expenses", async (req, res) => { try { await new Expense(req.body).save(); res.json({ success: true }); } catch (err) { res.status(500).json({ error: err.message }); } });
app.delete("/api/expenses/:id", async (req, res) => { try { await Expense.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (err) { res.status(500).json({ error: err.message }); } });

app.get("/api/plates", async (req, res) => { try { res.json(await Plate.find().sort({ _id: -1 })); } catch (err) { res.status(500).json({ error: err.message }); } });
app.post("/api/plates", async (req, res) => { try { await new Plate(req.body).save(); res.json({ success: true }); } catch (err) { res.status(500).json({ error: err.message }); } });
app.delete("/api/plates/:id", async (req, res) => { try { await Plate.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (err) { res.status(500).json({ error: err.message }); } });

app.get("/api/stats", async (req, res) => {
  try {
    const bikes = await Bike.find();
    const expenses = await Expense.find();
    const plates = await Plate.find();

    const purchases = bikes.filter(b => b.recordType === "purchase");
    const sales = bikes.filter(b => b.recordType === "sale");

    const totalPurchase = purchases.reduce((s, r) => s + (Number(r.totalPrice) || 0), 0);
    const totalSale = sales.reduce((s, r) => s + (Number(r.totalPrice) || 0), 0);
    const totalExpenses = expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);
    const plateProfit = plates.reduce((s, p) => s + ((Number(p.feeCharged) || 0) - (Number(p.feePaid) || 0)), 0);
    const bikeProfit = totalSale - totalPurchase;
    const netProfit = bikeProfit - totalExpenses + plateProfit;

    res.json({
      totalPurchase, totalSale, totalExpenses,
      plateProfit, bikeProfit, netProfit,
      totalBikes: bikes.length,
      purchaseCount: purchases.length,
      saleCount: sales.length,
      inStock: Math.max(0, purchases.length - sales.length),
      totalPlates: plates.length,
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server running on", PORT));