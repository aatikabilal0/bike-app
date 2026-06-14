import { useState, useEffect } from "react";

// Google Fonts - Font Option 4: Libre Baskerville + Josefin Sans
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Josefin+Sans:wght@300;400;500;600;700&display=swap";
document.head.appendChild(fontLink);

const API = "https://bike-app-production-dcce.up.railway.app";
const PASSWORD = "bikeshub2024";

const formatPKR = (n) => "Rs. " + (n || 0).toLocaleString("en-PK");
const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-PK") : "-";

const F = { heading: "'Libre Baskerville', serif", body: "'Josefin Sans', sans-serif" };
const C = { primary: "#1b4332", accent: "#2d6a4f", light: "#f0fdf4", border: "#d1fae5" };
const EMPTY_PURCHASE_FORM = {
  recordType: "purchase", date: "", bikeNumber: "", customerName: "", customerCnic: "", customerAddress: "",
  bikeName: "", cc: "", bikeModel: "", engineNumber: "", chassisNumber: "",
  totalPrice: "", amountPaid: "", remainingAmount: ""
};
const EMPTY_SALE_FORM = {
  recordType: "sale", date: "", bikeNumber: "", customerName: "", customerCnic: "", customerAddress: "",
  bikeName: "", cc: "", bikeModel: "", engineNumber: "", chassisNumber: "",
  totalPrice: "", receivedAmount: "", remainingAmount: ""
};

function Navbar({ page, setPage, isLoggedIn, onLogout }) {
  return (
    <nav style={{ background: "#fff", padding: "0 28px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100, fontFamily: F.body }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => setPage("home")}>
        <span style={{ fontSize: 22 }}>🏍️</span>
        <span style={{ fontFamily: F.heading, fontWeight: 700, color: C.primary, fontSize: 20, letterSpacing: 0.5 }}>Bikes Hub PK</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
        {["home", "blog"].map(pg => (
          <span key={pg} onClick={() => setPage(pg)} style={{ padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontFamily: F.body, fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: page === pg ? C.accent : "#64748b", background: page === pg ? C.light : "transparent", transition: "all 0.2s" }}>
            {pg}
          </span>
        ))}
        {isLoggedIn && [
          ["dashboard", "Dashboard"],
          ["bikes", "Inventory"],
          ["plates", "Registration"],
          ["expenses", "Expenses"],
        ].map(([pg, label
          
        ]) => (
          <span key={pg} onClick={() => setPage(pg)} style={{ padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontFamily: F.body, fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: page === pg ? C.accent : "#64748b", background: page === pg ? C.light : "transparent" }}>
            {label}
          </span>
        ))}
        {isLoggedIn
          ? <button onClick={onLogout} style={{ padding: "7px 18px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 12, fontFamily: F.body, letterSpacing: 1, textTransform: "uppercase" }}>Logout</button>
          : <button onClick={() => setPage("login")} style={{ padding: "7px 18px", background: C.primary, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 12, fontFamily: F.body, letterSpacing: 1, textTransform: "uppercase" }}>🔐 Login</button>
        }
      </div>
    </nav>
  );
}

function HomePage({ setPage }) {
  return (
    <div style={{ fontFamily: F.body }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.accent} 60%, #52b788 100%)`, color: "#fff", padding: "80px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 400 }}>
        <div style={{ maxWidth: 600 }}>
          <div style={{ background: "rgba(255,255,255,0.15)", display: "inline-block", padding: "5px 16px", borderRadius: 20, fontSize: 13, marginBottom: 20, fontFamily: F.body, letterSpacing: 2, textTransform: "uppercase" }}>
            🏍️ Lahore's Trusted Bike Dealer
          </div>
          <h1 style={{ fontFamily: F.heading, fontSize: 52, fontWeight: 700, margin: "0 0 10px 0", lineHeight: 1.15 }}>Bikes Hub PK</h1>
          <p style={{ fontSize: 20, opacity: 0.88, margin: "0 0 16px 0", fontWeight: 300, letterSpacing: 2 }}>Buy • Sell • Repair • Register</p>
          <p style={{ fontSize: 15, opacity: 0.78, lineHeight: 1.8, margin: "0 0 32px 0" }}>Premium quality used bikes at the best prices. Expert repairs, number plate registration, and hassle-free buying experience in Lahore.</p>
          <div style={{ display: "flex", gap: 16 }}>
            <button onClick={() => setPage("blog")} style={{ padding: "12px 28px", background: "#fff", color: C.primary, border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 14, fontFamily: F.body, letterSpacing: 1 }}>View Bikes</button>
            <button onClick={() => setPage("login")} style={{ padding: "12px 28px", background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.6)", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 14, fontFamily: F.body, letterSpacing: 1 }}>Manage Shop</button>
          </div>
        </div>
        <div style={{ fontSize: 140, opacity: 0.18 }}>🏍️</div>
      </div>

      {/* Services */}
      <div style={{ padding: "64px 56px" }}>
        <h2 style={{ fontFamily: F.heading, fontSize: 32, fontWeight: 700, color: C.primary, marginBottom: 40, textAlign: "center" }}>Our Services</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 24 }}>
          {[
            { icon: "🏍️", title: "Buy & Sell Bikes", desc: "Wide range of quality used bikes at affordable prices" },
            { icon: "🔧", title: "Bike Repairs", desc: "Expert mechanics for all types of repairs and maintenance" },
            { icon: "📋", title: "Number Plate Registration", desc: "Fast and easy number plate registration service" },
            { icon: "✅", title: "Quality Assured", desc: "All bikes thoroughly inspected before sale" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#fff", border: `1px solid ${C.border}`, borderTop: `4px solid ${C.accent}`, borderRadius: 12, padding: 28, textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 42, marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontFamily: F.heading, fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 10, marginTop: 0 }}>{s.title}</h3>
              <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: 13, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Us */}
      <div style={{ padding: "56px", background: C.light }}>
        <h2 style={{ fontFamily: F.heading, fontSize: 32, fontWeight: 700, color: C.primary, marginBottom: 36, textAlign: "center" }}>Why Choose Us?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, maxWidth: 900, margin: "0 auto" }}>
          {["Trusted by 500+ customers", "Best prices in Lahore", "Fast number plate service", "Expert mechanics", "Genuine parts only", "After-sale support"].map((item, i) => (
            <div key={i} style={{ background: "#fff", padding: "14px 20px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 13, color: C.primary, fontWeight: 500, fontFamily: F.body }}>✅ {item}</div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div style={{ padding: "56px" }}>
        <h2 style={{ fontFamily: F.heading, fontSize: 32, fontWeight: 700, color: C.primary, marginBottom: 36, textAlign: "center" }}>Contact Us</h2>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          {["📍 Lahore, Pakistan", "📞 Call for details", "⏰ Open 9am - 9pm"].map((c, i) => (
            <div key={i} style={{ background: C.light, padding: "18px 32px", borderRadius: 12, fontSize: 15, color: C.primary, fontWeight: 600, border: `1px solid ${C.border}` }}>{c}</div>
          ))}
        </div>
      </div>

      <footer style={{ background: C.primary, color: "rgba(255,255,255,0.6)", textAlign: "center", padding: 24, fontSize: 13, fontFamily: F.body, letterSpacing: 1 }}>
        © 2024 Bikes Hub PK — All rights reserved
      </footer>
    </div>
  );
}

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${API}/api/blogs`).then(r => r.json()).then(data => { setBlogs(Array.isArray(data) ? data : []); setLoading(false); }).catch(() => setLoading(false));
  }, []);
  return (
    <div style={{ padding: "32px 40px", maxWidth: 1200, margin: "0 auto", fontFamily: F.body }}>
      <h1 style={{ fontFamily: F.heading, fontSize: 28, color: C.primary, marginBottom: 28 }}>Latest Bikes & Updates</h1>
      {loading ? <div style={{ textAlign: "center", padding: 60, color: "#64748b" }}>Loading...</div> :
        blogs.length === 0
          ? <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}><div style={{ fontSize: 60 }}>🏍️</div><p>No posts yet. Check back soon!</p></div>
          : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {blogs.map(b => (
                <div key={b._id} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  {b.image && <img src={b.image} alt={b.title} style={{ width: "100%", height: 200, objectFit: "cover" }} />}
                  <div style={{ padding: 22 }}>
                    <h3 style={{ fontFamily: F.heading, fontSize: 17, color: C.primary, marginBottom: 8, marginTop: 0 }}>{b.title}</h3>
                    <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: 14 }}>{b.content}</p>
                    <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 12 }}>{formatDate(b.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
      }
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const handleLogin = () => { if (pass === PASSWORD) { onLogin(); } else setError("Incorrect password."); };
  return (
    <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", background: C.light, fontFamily: F.body }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 48, width: 380, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", textAlign: "center", border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🔐</div>
        <h2 style={{ fontFamily: F.heading, fontSize: 24, color: C.primary, marginBottom: 6, marginTop: 0 }}>Admin Login</h2>
        <p style={{ color: "#64748b", marginBottom: 28, fontSize: 13, letterSpacing: 0.5 }}>Bikes Hub PK — Management Portal</p>
        <input type="password" placeholder="Enter password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} style={{ padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, width: "100%", marginBottom: 12, boxSizing: "border-box", fontFamily: F.body, outline: "none" }} />
        {error && <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button onClick={handleLogin} style={{ padding: "11px 0", background: C.primary, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 14, fontFamily: F.body, width: "100%", letterSpacing: 1 }}>Login →</button>
      </div>
    </div>
  );
}

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${API}/api/stats`).then(r => r.json()).then(data => { setStats(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);
  if (loading) return <div style={{ textAlign: "center", padding: 60, fontFamily: F.body, color: "#64748b" }}>Loading stats...</div>;
  if (!stats) return <div style={{ padding: 40, textAlign: "center", color: "#ef4444" }}>Could not load stats.</div>;
  const cards = [
    { label: "Total Investment", value: formatPKR(stats.totalInvestment), icon: "💰", color: "#3b82f6" },
    { label: "Total Sale", value: formatPKR(stats.totalSale), icon: "✅", color: "#10b981" },
    { label: "Total Expenses", value: formatPKR(stats.totalExpenses), icon: "💸", color: "#ef4444" },
    { label: "Bike Profit", value: formatPKR(stats.bikeProfit), icon: "📈", color: C.accent },
    { label: "Plate Profit", value: formatPKR(stats.plateProfit), icon: "🏷️", color: "#8b5cf6" },
    { label: "Net Profit", value: formatPKR(stats.netProfit), icon: stats.netProfit >= 0 ? "🟢" : "🔴", color: stats.netProfit >= 0 ? "#10b981" : "#ef4444" },
  ];

  return (
    <div style={{ padding: "32px 40px", maxWidth: 1400, margin: "0 auto", fontFamily: F.body }}>
      <h1 style={{ fontFamily: F.heading, fontSize: 28, color: C.primary, marginBottom: 4, marginTop: 0 }}>📊 Dashboard</h1>
      <p style={{ color: "#64748b", marginBottom: 28, fontSize: 13, letterSpacing: 0.5 }}>Business Overview — Bikes Hub PK</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 18, marginBottom: 32 }}>
        {cards.map((c, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center", border: `1px solid ${C.border}`, borderTop: `4px solid ${c.color}` }}>
            <div style={{ fontSize: 30, marginBottom: 8 }}>{c.icon}</div>
            <div style={{ fontFamily: F.heading, fontSize: 20, fontWeight: 700, color: C.primary, marginBottom: 4 }}>{c.value}</div>
            <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>{c.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 28, maxWidth: 520 }}>
        <h3 style={{ fontFamily: F.heading, marginTop: 0, marginBottom: 16, color: C.primary }}>Profit Summary</h3>
        {[
          ["Total Sale", formatPKR(stats.totalSale), "#10b981", false],
          ["Total Purchase (Investment)", `- ${formatPKR(stats.totalPurchase)}`, "#ef4444", false],
          ["Total Expenses", `- ${formatPKR(stats.totalExpenses)}`, "#ef4444", false],
          ["Plate Profit", `+ ${formatPKR(stats.plateProfit)}`, "#10b981", false],
          ["NET PROFIT", formatPKR(stats.netProfit), stats.netProfit >= 0 ? "#10b981" : "#ef4444", true],
        ].map(([label, val, color, bold], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: bold ? "none" : "1px solid #f1f5f9", fontSize: bold ? 17 : 14, fontWeight: bold ? 700 : 400, marginTop: bold ? 8 : 0 }}>
            <span>{label}</span><span style={{ color }}>{val}</span>
          </div>
        ))}
      </div>

      {Array.isArray(stats.breakdown) && stats.breakdown.length > 0 && (
        <div style={{ marginTop: 18, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <thead>
              <tr style={{ background: C.primary }}>
                {[
                  "Bike Name",
                  "Stock (InStock)",
                  "Sold",
                  "Purchase Total",
                  "Sale Total",
                  "Allocated Expense",
                  "Profit/Loss",
                ].map((h) => (
                  <th key={h} style={{ padding: "12px 14px", color: "#fff", fontSize: 11, fontWeight: 700, textAlign: "left", whiteSpace: "nowrap", fontFamily: F.body, letterSpacing: 0.5, textTransform: "uppercase" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.breakdown.map((b, i) => (
                <tr key={b.bikeName || i} style={{ borderBottom: `1px solid ${C.light}` }}>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: C.primary, fontWeight: 700 }}>{b.bikeName}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151", fontWeight: 700 }}>{b.inStock}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#10b981", fontWeight: 700 }}>{b.saleCount}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{formatPKR(b.purchaseTotal)}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{formatPKR(b.saleTotal)}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#ef4444", fontWeight: 700 }}>{formatPKR(b.allocatedExpense)}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: b.profit >= 0 ? "#10b981" : "#ef4444", fontWeight: 800 }}>{formatPKR(b.profit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

// ========== BIKES PAGE — Bought & Sold Alag ==========
// ========== INVENTORY PAGE — Purchase & Sale Alag ==========
function BikesPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("purchase"); // "purchase" ya "sale"
  const [search, setSearch] = useState("");

  const [form, setForm] = useState(EMPTY_PURCHASE_FORM);
  const [saving, setSaving] = useState(false);

  const loadRecords = () => {
    fetch(`${API}/api/bikes`).then(r => r.json()).then(data => { setRecords(Array.isArray(data) ? data : []); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { loadRecords(); }, []);

  // Jab tab change ho, form reset karo us tab ke hisaab se
  useEffect(() => {
    setForm(activeTab === "purchase" ? EMPTY_PURCHASE_FORM : EMPTY_SALE_FORM);
    setShowForm(false);
  }, [activeTab]);

  const purchaseRecords = records.filter(r => r.recordType === "purchase");
  const saleRecords = records.filter(r => r.recordType === "sale");

  // Agla number nikalna - existing max number + 1
  const nextNumber = (list) => {
    if (list.length === 0) return 1;
    return Math.max(...list.map(r => Number(r.recordNumber) || 0)) + 1;
  };

  const matchesSearch = (r) => !search || [r.bikeName, r.bikeModel, r.customerName, r.engineNumber, r.chassisNumber, String(r.recordNumber || "")].some(f => f?.toString().toLowerCase().includes(search.toLowerCase()));

  const filteredPurchase = purchaseRecords.filter(matchesSearch);
  const filteredSale = saleRecords.filter(matchesSearch);

  const saveRecord = async () => {
    setSaving(true);
    const list = activeTab === "purchase" ? purchaseRecords : saleRecords;
    const recordNumber = nextNumber(list);
    const payload = { ...form, recordNumber };
    await fetch(`${API}/api/bikes`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSaving(false);
    setForm(activeTab === "purchase" ? EMPTY_PURCHASE_FORM : EMPTY_SALE_FORM);
    setShowForm(false);
    loadRecords();
  };

  const deleteRecord = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    await fetch(`${API}/api/bikes/${id}`, { method: "DELETE" });
    loadRecords();
  };

  // Total Price ya Paid/Received change hote hi Remaining Amount khud-bakhud calculate
  const handleAmountChange = (key, value) => {
    const updated = { ...form, [key]: value };
    const total = Number(updated.totalPrice) || 0;
    const paidKey = activeTab === "purchase" ? "amountPaid" : "receivedAmount";
    const paid = Number(updated[paidKey]) || 0;
    updated.remainingAmount = total - paid;
    setForm(updated);
  };

  const textFields = [
    ["Bike Number", "bikeNumber"],
    ["Customer Name", "customerName"], ["CNIC Number", "customerCnic"], ["Address", "customerAddress"],
    ["Bike Name", "bikeName"], ["CC", "cc"], ["Bike Model", "bikeModel"],
    ["Engine Number", "engineNumber"], ["Chassis Number", "chassisNumber"],
  ];

  const headers = activeTab === "purchase"
    ? ["Purchase Number", "Date", "Bike Number", "Customer", "CNIC", "Address", "Bike Name", "CC", "Model", "Engine #", "Chassis #", "Total Price", "Paid", "Remaining", "Del"]
    : ["Account Number", "Date", "Bike Number", "Customer", "CNIC", "Address", "Bike Name", "CC", "Model", "Engine #", "Chassis #", "Total Price", "Received", "Remaining", "Del"];

  const activeRows = activeTab === "purchase" ? filteredPurchase : filteredSale;

  return (
    <div style={{ padding: "32px 40px", maxWidth: 1400, margin: "0 auto", fontFamily: F.body }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontFamily: F.heading, fontSize: 28, color: C.primary, margin: 0 }}>🏍️ Bike Inventory</h1>
        <input type="text" placeholder="🔍 Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "9px 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body, outline: "none", minWidth: 200 }} />
        <button onClick={() => setShowForm(!showForm)} style={{ padding: "9px 22px", background: C.primary, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: F.body, letterSpacing: 0.5 }}>
          {showForm ? "✕ Cancel" : `+ Add ${activeTab === "purchase" ? "Purchase" : "Sale"}`}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: 22, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", maxWidth: 400 }}>
        {[["purchase", "🛒 Purchase", purchaseRecords.length], ["sale", "✅ Sale", saleRecords.length]].map(([tab, label, count]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            flex: 1, padding: "10px 0", border: "none", cursor: "pointer", fontFamily: F.body, fontWeight: 700, fontSize: 13, letterSpacing: 0.5,
            background: activeTab === tab ? C.primary : "#fff",
            color: activeTab === tab ? "#fff" : C.primary,
            transition: "all 0.2s"
          }}>
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Add Form */}
      {showForm && (
        <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 22 }}>
          <h3 style={{ fontFamily: F.heading, fontSize: 17, color: C.primary, marginBottom: 18, marginTop: 0 }}>
            New {activeTab === "purchase" ? "Purchase" : "Sale"} Entry — {activeTab === "purchase" ? "Purchase Number" : "Account Number"}: {nextNumber(activeTab === "purchase" ? purchaseRecords : saleRecords)}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.primary, letterSpacing: 0.5 }}>Date</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body, outline: "none" }} />
            </div>
            {textFields.map(([label, key]) => (
              <div key={key} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.primary, letterSpacing: 0.5 }}>{label}</label>
                <input type="text" value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body, outline: "none" }} placeholder={label} />
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.primary, letterSpacing: 0.5 }}>Total Price (Rs.)</label>
              <input type="number" value={form.totalPrice} onChange={e => handleAmountChange("totalPrice", e.target.value)} style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body, outline: "none" }} placeholder="0" />
            </div>
            {activeTab === "purchase" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.primary, letterSpacing: 0.5 }}>Amount Paid (Rs.)</label>
                <input type="number" value={form.amountPaid} onChange={e => handleAmountChange("amountPaid", e.target.value)} style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body, outline: "none" }} placeholder="0" />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.primary, letterSpacing: 0.5 }}>Received Amount (Rs.)</label>
                <input type="number" value={form.receivedAmount} onChange={e => handleAmountChange("receivedAmount", e.target.value)} style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body, outline: "none" }} placeholder="0" />
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.primary, letterSpacing: 0.5 }}>Remaining Amount (Rs.)</label>
              <input type="number" value={form.remainingAmount} readOnly style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body, outline: "none", background: C.light, color: C.primary, fontWeight: 700 }} placeholder="0" />
            </div>
          </div>
          <button onClick={saveRecord} disabled={saving} style={{ padding: "10px 24px", background: C.primary, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: F.body }}>
            {saving ? "Saving..." : "Save Entry"}
          </button>
        </div>
      )}

      {/* Table */}
      {loading ? <div style={{ textAlign: "center", padding: 60, color: "#64748b" }}>Loading...</div> :
        activeRows.length === 0
          ? <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}><div style={{ fontSize: 60 }}>{activeTab === "purchase" ? "🛒" : "✅"}</div><p>No {activeTab} records yet.</p></div>
          : <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <thead>
                  <tr style={{ background: activeTab === "purchase" ? C.primary : "#166534" }}>
                    {headers.map(h => (
                      <th key={h} style={{ padding: "12px 14px", color: "#fff", fontSize: 11, fontWeight: 700, textAlign: "left", whiteSpace: "nowrap", fontFamily: F.body, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeRows.map(r => (
                    <tr key={r._id} style={{ borderBottom: `1px solid ${C.light}` }}>
                      <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 700, color: C.primary }}>{r.recordNumber || "-"}</td>
                      <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{formatDate(r.date || r.createdAt)}</td>
                      <td style={{ padding: "11px 14px", fontSize: 13, color: C.primary, fontWeight: 600 }}>{r.bikeNumber || "-"}</td>
                      <td style={{ padding: "11px 14px", fontSize: 13, color: C.primary, fontWeight: 600 }}>{r.customerName || "-"}</td>
                      <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{r.customerCnic || "-"}</td>
                      <td style={{ padding: "11px 14px", fontSize: 12, color: "#64748b", maxWidth: 140, whiteSpace: "normal" }}>{r.customerAddress || "-"}</td>
                      <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{r.bikeName || "-"}</td>
                      <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{r.cc || "-"}</td>
                      <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{r.bikeModel || "-"}</td>
                      <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{r.engineNumber || "-"}</td>
                      <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{r.chassisNumber || "-"}</td>
                      <td style={{ padding: "11px 14px", fontSize: 13, color: C.accent, fontWeight: 600 }}>{formatPKR(r.totalPrice)}</td>
                      <td style={{ padding: "11px 14px", fontSize: 13, color: "#10b981" }}>{formatPKR(activeTab === "purchase" ? r.amountPaid : r.receivedAmount)}</td>
                      <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 700, color: (r.remainingAmount || 0) > 0 ? "#ef4444" : "#10b981" }}>{formatPKR(r.remainingAmount)}</td>
                      <td style={{ padding: "11px 14px" }}><button onClick={() => deleteRecord(r._id)} style={{ background: "#fee2e2", border: "none", borderRadius: 6, padding: "5px 9px", cursor: "pointer" }}>🗑️</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
      }
    </div>
  );
}

function PlatesPage() {
  const [plates, setPlates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const emptyForm = { ownerName: "", cnic: "", bikeModel: "", cc: "", engineNumber: "", chassisNumber: "", oldPlate: "", newPlate: "", registrationDate: "", feeCharged: "", feePaid: "", status: "Pending", notes: "" };
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const loadPlates = () => { fetch(`${API}/api/plates`).then(r => r.json()).then(data => { setPlates(Array.isArray(data) ? data : []); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(() => { loadPlates(); }, []);
  const savePlate = async () => {
    setSaving(true);
    await fetch(`${API}/api/plates`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false); setForm(emptyForm); setShowForm(false); loadPlates();
  };
  const deletePlate = async (id) => { if (!window.confirm("Delete?")) return; await fetch(`${API}/api/plates/${id}`, { method: "DELETE" }); loadPlates(); };
  const totalProfit = plates.reduce((sum, p) => sum + ((p.feeCharged || 0) - (p.feePaid || 0)), 0);
  return (
    <div style={{ padding: "32px 40px", maxWidth: 1400, margin: "0 auto", fontFamily: F.body }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontFamily: F.heading, fontSize: 28, color: C.primary, margin: 0 }}>📋 Registration</h1>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: "9px 22px", background: C.primary, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: F.body }}>
          {showForm ? "✕ Cancel" : "+ Add Record"}
        </button>
      </div>
      <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderTop: `4px solid #8b5cf6`, borderRadius: 12, padding: 22, textAlign: "center", maxWidth: 200, marginBottom: 24 }}>
        <div style={{ fontSize: 30, marginBottom: 8 }}>💰</div>
        <div style={{ fontFamily: F.heading, fontSize: 20, color: C.primary, marginBottom: 4 }}>{formatPKR(totalProfit)}</div>
        <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>Total Plate Profit</div>
      </div>
      {showForm && (
        <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 22 }}>
          <h3 style={{ fontFamily: F.heading, fontSize: 17, color: C.primary, marginBottom: 18, marginTop: 0 }}>New Registration Record</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>Date</label>
              <input type="date" value={form.registrationDate} onChange={e => setForm({ ...form, registrationDate: e.target.value })} style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body, outline: "none" }} />
            </div>
            {[["Owner Name", "ownerName"], ["CNIC", "cnic"], ["Bike Model", "bikeModel"], ["CC", "cc"], ["Engine Number", "engineNumber"], ["Chassis Number", "chassisNumber"], ["Old Number", "oldPlate"], ["New Number", "newPlate"]].map(([label, key]) => (
              <div key={key} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>{label}</label>
                <input type="text" value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body, outline: "none" }} />
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>Fee Charged from Customer (Rs.)</label>
              <input type="number" value={form.feeCharged} onChange={e => setForm({ ...form, feeCharged: e.target.value })} style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body, outline: "none" }} placeholder="0" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>Fee Paid to Govt (Rs.)</label>
              <input type="number" value={form.feePaid} onChange={e => setForm({ ...form, feePaid: e.target.value })} style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body, outline: "none" }} placeholder="0" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body }}>
                <option>Pending</option><option>Complete</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, gridColumn: "1 / -1" }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>Notes</label>
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body, height: 70, resize: "vertical", outline: "none" }} />
            </div>
          </div>
          {form.feeCharged && form.feePaid && (
            <div style={{ background: C.light, color: C.accent, padding: "10px 16px", borderRadius: 8, marginBottom: 14, fontWeight: 700, fontSize: 14 }}>
              Profit: {formatPKR((+form.feeCharged || 0) - (+form.feePaid || 0))}
            </div>
          )}
          <button onClick={savePlate} disabled={saving} style={{ padding: "10px 24px", background: C.primary, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: F.body }}>
            {saving ? "Saving..." : "Save Record"}
          </button>
        </div>
      )}
      {loading ? <div style={{ textAlign: "center", padding: 60, color: "#64748b" }}>Loading...</div> :
        plates.length === 0 ? <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}><div style={{ fontSize: 60 }}>📋</div><p>No records yet.</p></div> :
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <thead><tr style={{ background: C.primary }}>
              {["Owner", "CNIC", "Bike", "Engine #", "Chassis #", "Old Number", "New Number", "Date", "Charged", "Paid", "Profit", "Status", "Del"].map(h => (
                <th key={h} style={{ padding: "12px 14px", color: "#fff", fontSize: 11, fontWeight: 700, textAlign: "left", whiteSpace: "nowrap", fontFamily: F.body, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {plates.map(p => (
                <tr key={p._id} style={{ borderBottom: `1px solid ${C.light}` }}>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: C.primary, fontWeight: 600 }}>{p.ownerName || "-"}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{p.cnic || "-"}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{p.bikeModel || "-"}{p.cc ? ` (${p.cc})` : ""}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{p.engineNumber || "-"}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{p.chassisNumber || "-"}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{p.oldPlate || "-"}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{p.newPlate || "-"}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{formatDate(p.registrationDate || p.createdAt)}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{formatPKR(p.feeCharged)}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{formatPKR(p.feePaid)}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 700, color: "#10b981" }}>{formatPKR((p.feeCharged || 0) - (p.feePaid || 0))}</td>
                  <td style={{ padding: "11px 14px" }}><span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: p.status === "Complete" ? "#dcfce7" : "#fef9c3", color: p.status === "Complete" ? "#166534" : "#854d0e" }}>{p.status}</span></td>
                  <td style={{ padding: "11px 14px" }}><button onClick={() => deletePlate(p._id)} style={{ background: "#fee2e2", border: "none", borderRadius: 6, padding: "5px 9px", cursor: "pointer" }}>🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const emptyForm = { title: "", amount: "", category: "Repair", date: "", notes: "" };
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const loadExpenses = () => { fetch(`${API}/api/expenses`).then(r => r.json()).then(data => { setExpenses(Array.isArray(data) ? data : []); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(() => { loadExpenses(); }, []);
  const saveExpense = async () => {
    setSaving(true);
    await fetch(`${API}/api/expenses`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false); setForm(emptyForm); setShowForm(false); loadExpenses();
  };
  const deleteExpense = async (id) => { if (!window.confirm("Delete?")) return; await fetch(`${API}/api/expenses/${id}`, { method: "DELETE" }); loadExpenses(); };
  const total = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  return (
    <div style={{ padding: "32px 40px", maxWidth: 1400, margin: "0 auto", fontFamily: F.body }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontFamily: F.heading, fontSize: 28, color: C.primary, margin: 0 }}>💸 Expenses</h1>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: "9px 22px", background: C.primary, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: F.body }}>
          {showForm ? "✕ Cancel" : "+ Add Expense"}
        </button>
      </div>
      <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderTop: "4px solid #ef4444", borderRadius: 12, padding: 22, textAlign: "center", maxWidth: 200, marginBottom: 24 }}>
        <div style={{ fontSize: 30, marginBottom: 8 }}>💸</div>
        <div style={{ fontFamily: F.heading, fontSize: 20, color: C.primary, marginBottom: 4 }}>{formatPKR(total)}</div>
        <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>Total Expenses</div>
      </div>
      {showForm && (
        <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 22 }}>
          <h3 style={{ fontFamily: F.heading, fontSize: 17, color: C.primary, marginBottom: 18, marginTop: 0 }}>Add Expense</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 14 }}>
            {[["Title", "title", "text"], ["Amount (Rs.)", "amount", "number"]].map(([label, key, type]) => (
              <div key={key} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>{label}</label>
                <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body, outline: "none" }} />
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body }}>
                {["Repair", "Parts", "Transport", "Tools", "Rent", "Utilities", "Other"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>Date</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body, outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, gridColumn: "1 / -1" }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>Notes</label>
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: F.body, height: 70, resize: "vertical", outline: "none" }} />
            </div>
          </div>
          <button onClick={saveExpense} disabled={saving} style={{ padding: "10px 24px", background: C.primary, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: F.body }}>
            {saving ? "Saving..." : "Save Expense"}
          </button>
        </div>
      )}
      {loading ? <div style={{ textAlign: "center", padding: 60, color: "#64748b" }}>Loading...</div> :
        expenses.length === 0 ? <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}><div style={{ fontSize: 60 }}>💸</div><p>No expenses yet.</p></div> :
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <thead><tr style={{ background: C.primary }}>
              {["Title", "Category", "Amount", "Date", "Notes", "Del"].map(h => (
                <th key={h} style={{ padding: "12px 14px", color: "#fff", fontSize: 11, fontWeight: 700, textAlign: "left", fontFamily: F.body, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {expenses.map(e => (
                <tr key={e._id} style={{ borderBottom: `1px solid ${C.light}` }}>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: C.primary, fontWeight: 600 }}>{e.title || "-"}</td>
                  <td style={{ padding: "11px 14px" }}><span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: C.light, color: C.accent }}>{e.category}</span></td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#ef4444", fontWeight: 700 }}>{formatPKR(e.amount)}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#374151" }}>{formatDate(e.date || e.createdAt)}</td>
                  <td style={{ padding: "11px 14px", fontSize: 13, color: "#64748b" }}>{e.notes || "-"}</td>
                  <td style={{ padding: "11px 14px" }}><button onClick={() => deleteExpense(e._id)} style={{ background: "#fee2e2", border: "none", borderRadius: 6, padding: "5px 9px", cursor: "pointer" }}>🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => { setIsLoggedIn(true); setPage("dashboard"); };
  const handleLogout = () => { setIsLoggedIn(false); setPage("home"); };
  const renderPage = () => {
    if (page === "login") return <LoginPage onLogin={handleLogin} />;
    if (page === "blog") return <BlogPage />;
    if (!isLoggedIn && ["dashboard", "bikes", "plates", "expenses"].includes(page)) return <LoginPage onLogin={handleLogin} />;
    if (page === "dashboard") return <DashboardPage />;
    if (page === "bikes") return <BikesPage />;
    if (page === "plates") return <PlatesPage />;
    if (page === "expenses") return <ExpensesPage />;
    return <HomePage setPage={setPage} />;
  };
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafb", fontFamily: F.body }}>
      <Navbar page={page} setPage={setPage} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      {renderPage()}
    </div>
  );
}
