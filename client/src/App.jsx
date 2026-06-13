import { useState, useEffect } from "react";

// Google Fonts
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap";
document.head.appendChild(fontLink);

const API = "https://bike-app-production-dcce.up.railway.app";
const PASSWORD = "bikeshub2024";

const formatPKR = (n) => "Rs. " + (n || 0).toLocaleString("en-PK");
const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-PK") : "-";

function Navbar({ page, setPage, isLoggedIn, onLogout }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.navBrand} onClick={() => setPage("home")}>
        🏍️ <span style={styles.brandText}>Bikes Hub PK</span>
      </div>
      <div style={styles.navLinks}>
        {["home", "blog"].map(pg => (
          <span key={pg} onClick={() => setPage(pg)} style={{ ...styles.navLink, ...(page === pg ? styles.navLinkActive : {}) }}>
            {pg.charAt(0).toUpperCase() + pg.slice(1)}
          </span>
        ))}
        {isLoggedIn && ["dashboard", "bikes", "plates", "expenses"].map(pg => (
          <span key={pg} onClick={() => setPage(pg)} style={{ ...styles.navLink, ...(page === pg ? styles.navLinkActive : {}) }}>
            {pg === "bikes" ? "Inventory" : pg === "plates" ? "Plates" : pg.charAt(0).toUpperCase() + pg.slice(1)}
          </span>
        ))}
        {isLoggedIn
          ? <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
          : <button style={styles.loginBtn} onClick={() => setPage("login")}>🔐 Login</button>
        }
      </div>
    </nav>
  );
}

function HomePage({ setPage }) {
  return (
    <div>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>🏍️ Lahore's Trusted Bike Dealer</div>
          <h1 style={styles.heroTitle}>Bikes Hub PK</h1>
          <p style={styles.heroSubtitle}>Buy • Sell • Repair • Register</p>
          <p style={styles.heroDesc}>Premium quality used bikes at the best prices. Expert repairs, number plate registration, and hassle-free buying experience in Lahore.</p>
          <div style={styles.heroButtons}>
            <button style={styles.btnPrimary} onClick={() => setPage("blog")}>View Bikes</button>
            <button style={styles.btnOutline} onClick={() => setPage("login")}>Manage Shop</button>
          </div>
        </div>
        <div style={{ fontSize: 130, opacity: 0.25 }}>🏍️</div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <div style={styles.servicesGrid}>
          {[
            { icon: "🏍️", title: "Buy & Sell Bikes", desc: "Wide range of quality used bikes at affordable prices" },
            { icon: "🔧", title: "Bike Repairs", desc: "Expert mechanics for all types of repairs and maintenance" },
            { icon: "📋", title: "Number Plate Registration", desc: "Fast and easy number plate registration service" },
            { icon: "✅", title: "Quality Assured", desc: "All bikes thoroughly inspected before sale" },
          ].map((s, i) => (
            <div key={i} style={styles.serviceCard}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{s.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: "#1e293b", marginBottom: 8, marginTop: 0 }}>{s.title}</h3>
              <p style={{ color: "#64748b", lineHeight: 1.6, fontSize: 14, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...styles.section, background: "#f8fafc" }}>
        <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, maxWidth: 900, margin: "0 auto" }}>
          {["Trusted by 500+ customers", "Best prices in Lahore", "Fast number plate service", "Expert mechanics", "Genuine parts only", "After-sale support"].map((item, i) => (
            <div key={i} style={{ background: "#fff", padding: "14px 20px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, color: "#374151" }}>✅ {item}</div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Contact Us</h2>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          {["📍 Lahore, Pakistan", "📞 Call for details", "⏰ Open 9am - 9pm"].map((c, i) => (
            <div key={i} style={{ background: "#eff6ff", padding: "18px 28px", borderRadius: 12, fontSize: 15, color: "#1d4ed8", fontWeight: 500 }}>{c}</div>
          ))}
        </div>
      </div>

      <footer style={{ background: "#1e293b", color: "#94a3b8", textAlign: "center", padding: 24, fontSize: 14 }}>
        © 2024 Bikes Hub PK — All rights reserved
      </footer>
    </div>
  );
}

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/blogs`)
      .then(r => r.json())
      .then(data => { setBlogs(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.pageTitle}>Latest Bikes & Updates</h1>
      {loading ? <div style={styles.loading}>Loading...</div> :
        blogs.length === 0
          ? <div style={styles.empty}><div style={{ fontSize: 60 }}>🏍️</div><p>No posts yet. Check back soon!</p></div>
          : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {blogs.map(b => (
                <div key={b._id} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  {b.image && <img src={b.image} alt={b.title} style={{ width: "100%", height: 200, objectFit: "cover" }} />}
                  <div style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1e293b", marginBottom: 8, marginTop: 0 }}>{b.title}</h3>
                    <p style={{ color: "#64748b", lineHeight: 1.6, fontSize: 14 }}>{b.content}</p>
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
  const handleLogin = () => {
    if (pass === PASSWORD) { onLogin(); setError(""); }
    else setError("Incorrect password. Try again.");
  };
  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🔐</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1e293b", marginBottom: 6, marginTop: 0 }}>Admin Login</h2>
        <p style={{ color: "#64748b", marginBottom: 28, fontSize: 14 }}>Bikes Hub PK — Management Portal</p>
        <input type="password" placeholder="Enter password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} style={{ ...styles.input, width: "100%", marginBottom: 12, boxSizing: "border-box" }} />
        {error && <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button style={{ ...styles.btnPrimary, width: "100%" }} onClick={handleLogin}>Login →</button>
      </div>
    </div>
  );
}

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/stats`)
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={styles.loading}>Loading stats...</div>;
  if (!stats) return <div style={{ padding: 40, textAlign: "center", color: "#ef4444" }}>Could not load stats.</div>;

  const cards = [
    { label: "Total Bikes", value: stats.totalBikes, icon: "🏍️", color: "#3b82f6" },
    { label: "Sold Bikes", value: stats.soldBikes, icon: "✅", color: "#10b981" },
    { label: "In Stock", value: stats.inStock, icon: "📦", color: "#f59e0b" },
    { label: "Total Plates", value: stats.totalPlates, icon: "📋", color: "#8b5cf6" },
    { label: "Total Revenue", value: formatPKR(stats.totalRevenue), icon: "💰", color: "#10b981" },
    { label: "Total Expenses", value: formatPKR(stats.totalExpenses), icon: "💸", color: "#ef4444" },
    { label: "Bike Profit", value: formatPKR(stats.bikeProfit), icon: "📈", color: "#3b82f6" },
    { label: "Plate Profit", value: formatPKR(stats.plateProfit), icon: "🏷️", color: "#8b5cf6" },
    { label: "Net Profit", value: formatPKR(stats.netProfit), icon: stats.netProfit >= 0 ? "🟢" : "🔴", color: stats.netProfit >= 0 ? "#10b981" : "#ef4444" },
  ];

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.pageTitle}>📊 Dashboard</h1>
      <p style={{ color: "#64748b", marginBottom: 28, marginTop: 4 }}>Business Overview — Bikes Hub PK</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 18, marginBottom: 32 }}>
        {cards.map((c, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center", border: "1px solid #e2e8f0", borderTop: `4px solid ${c.color}` }}>
            <div style={{ fontSize: 30, marginBottom: 8 }}>{c.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>{c.value}</div>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>{c.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 28, maxWidth: 480, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <h3 style={{ marginTop: 0, marginBottom: 16, color: "#1e293b" }}>Profit Summary</h3>
        {[
          ["Bike Sales Revenue", formatPKR(stats.totalRevenue), "#10b981", false],
          ["Purchase Cost", `- ${formatPKR(stats.totalPurchase)}`, "#ef4444", false],
          ["Repair Cost", `- ${formatPKR(stats.totalRepair)}`, "#ef4444", false],
          ["Other Expenses", `- ${formatPKR(stats.totalExpenses)}`, "#ef4444", false],
          ["Plate Profit", `+ ${formatPKR(stats.plateProfit)}`, "#10b981", false],
          ["NET PROFIT", formatPKR(stats.netProfit), stats.netProfit >= 0 ? "#10b981" : "#ef4444", true],
        ].map(([label, val, color, bold], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: bold ? "none" : "1px solid #f1f5f9", fontSize: bold ? 17 : 15, fontWeight: bold ? 700 : 400, marginTop: bold ? 8 : 0 }}>
            <span>{label}</span><span style={{ color }}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BikesPage() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const emptyForm = { bikeName: "", bikeModel: "", cc: "", engineNumber: "", chassisNumber: "", purchaseYear: "", saleYear: "", condition: "Good", customerName: "", customerCnic: "", customerAddress: "", purchasePrice: "", salePrice: "", repairCost: "", status: "In Stock", notes: "" };
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadBikes = () => {
    fetch(`${API}/api/bikes`).then(r => r.json()).then(data => { setBikes(Array.isArray(data) ? data : []); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { loadBikes(); }, []);

  const saveBike = async () => {
    setSaving(true);
    await fetch(`${API}/api/bikes`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false); setForm(emptyForm); setShowForm(false); loadBikes();
  };

  const deleteBike = async (id) => {
    if (!window.confirm("Delete this bike?")) return;
    await fetch(`${API}/api/bikes/${id}`, { method: "DELETE" });
    loadBikes();
  };

  const filtered = bikes.filter(b => {
    const matchSearch = !search || [b.bikeName, b.bikeModel, b.customerName, b.engineNumber, b.chassisNumber].some(f => f?.toLowerCase().includes(search.toLowerCase()));
    return matchSearch && (filterStatus === "All" || b.status === filterStatus);
  });

  const fields = [["Bike Name", "bikeName"], ["Bike Model", "bikeModel"], ["CC", "cc"], ["Engine Number", "engineNumber"], ["Chassis Number", "chassisNumber"], ["Purchase Year", "purchaseYear"], ["Sale Year", "saleYear"], ["Customer Name", "customerName"], ["Customer CNIC", "customerCnic"], ["Customer Address", "customerAddress"]];
  const numFields = [["Purchase Price (Rs.)", "purchasePrice"], ["Sale Price (Rs.)", "salePrice"], ["Repair Cost (Rs.)", "repairCost"]];

  return (
    <div style={styles.pageContainer}>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>🏍️ Bike Inventory</h1>
        <button style={styles.btnPrimary} onClick={() => setShowForm(!showForm)}>{showForm ? "✕ Cancel" : "+ Add Bike"}</button>
      </div>

      {showForm && (
        <div style={styles.formCard}>
          <h3 style={{ ...styles.formTitle }}>Add New Bike</h3>
          <div style={styles.formGrid}>
            {fields.map(([label, key]) => (
              <div key={key} style={styles.formField}>
                <label style={styles.label}>{label}</label>
                <input type="text" value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={styles.input} placeholder={label} />
              </div>
            ))}
            {numFields.map(([label, key]) => (
              <div key={key} style={styles.formField}>
                <label style={styles.label}>{label}</label>
                <input type="number" value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={styles.input} placeholder="0" />
              </div>
            ))}
            <div style={styles.formField}>
              <label style={styles.label}>Condition</label>
              <select value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })} style={styles.input}>
                {["Excellent", "Good", "Fair", "Needs Repair"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={styles.input}>
                <option>In Stock</option><option>Sold</option>
              </select>
            </div>
            <div style={{ ...styles.formField, gridColumn: "1 / -1" }}>
              <label style={styles.label}>Notes</label>
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ ...styles.input, height: 70, resize: "vertical" }} placeholder="Any notes..." />
            </div>
          </div>
          {form.purchasePrice && form.salePrice && (
            <div style={{ background: "#eff6ff", color: "#1d4ed8", padding: "10px 16px", borderRadius: 8, marginBottom: 14, fontWeight: 600, fontSize: 14 }}>
              Profit Preview: {formatPKR((+form.salePrice || 0) - (+form.purchasePrice || 0) - (+form.repairCost || 0))}
            </div>
          )}
          <button style={styles.btnPrimary} onClick={saveBike} disabled={saving}>{saving ? "Saving..." : "Save Bike"}</button>
        </div>
      )}

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input type="text" placeholder="🔍 Search name, model, CNIC..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...styles.input, maxWidth: 280 }} />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={styles.input}>
          <option>All</option><option>In Stock</option><option>Sold</option>
        </select>
        <div style={{ marginLeft: "auto", alignSelf: "center", color: "#64748b", fontSize: 13 }}>{filtered.length} bikes</div>
      </div>

      {loading ? <div style={styles.loading}>Loading...</div> :
        filtered.length === 0 ? <div style={styles.empty}><div style={{ fontSize: 60 }}>🏍️</div><p>No bikes found.</p></div> :
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <thead>
              <tr style={{ background: "#1e40af" }}>
                {["Bike", "Model/CC", "Engine #", "Chassis #", "Cond.", "Status", "Buy", "Sale", "Repair", "Profit", "Customer", "Del"].map(h => (
                  <th key={h} style={{ padding: "12px 14px", color: "#fff", fontSize: 12, fontWeight: 600, textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => {
                const profit = (b.salePrice || 0) - (b.purchasePrice || 0) - (b.repairCost || 0);
                return (
                  <tr key={b._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={styles.td}>{b.bikeName || "-"}</td>
                    <td style={styles.td}>{b.bikeModel || "-"}{b.cc ? ` (${b.cc})` : ""}</td>
                    <td style={styles.td}>{b.engineNumber || "-"}</td>
                    <td style={styles.td}>{b.chassisNumber || "-"}</td>
                    <td style={styles.td}>{b.condition || "-"}</td>
                    <td style={styles.td}><span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: b.status === "Sold" ? "#dcfce7" : "#dbeafe", color: b.status === "Sold" ? "#166534" : "#1d4ed8" }}>{b.status || "In Stock"}</span></td>
                    <td style={styles.td}>{formatPKR(b.purchasePrice)}</td>
                    <td style={styles.td}>{b.status === "Sold" ? formatPKR(b.salePrice) : "-"}</td>
                    <td style={styles.td}>{formatPKR(b.repairCost)}</td>
                    <td style={{ ...styles.td, color: profit >= 0 ? "#10b981" : "#ef4444", fontWeight: 600 }}>{b.status === "Sold" ? formatPKR(profit) : "-"}</td>
                    <td style={styles.td}>{b.customerName || "-"}</td>
                    <td style={styles.td}><button style={{ background: "#fee2e2", border: "none", borderRadius: 6, padding: "5px 9px", cursor: "pointer" }} onClick={() => deleteBike(b._id)}>🗑️</button></td>
                  </tr>
                );
              })}
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
  const emptyForm = { ownerName: "", cnic: "", bikeModel: "", cc: "", oldPlate: "", newPlate: "", registrationDate: "", feeCharged: "", feePaid: "", status: "Pending", notes: "" };
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadPlates = () => {
    fetch(`${API}/api/plates`).then(r => r.json()).then(data => { setPlates(Array.isArray(data) ? data : []); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { loadPlates(); }, []);

  const savePlate = async () => {
    setSaving(true);
    await fetch(`${API}/api/plates`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false); setForm(emptyForm); setShowForm(false); loadPlates();
  };

  const deletePlate = async (id) => {
    if (!window.confirm("Delete?")) return;
    await fetch(`${API}/api/plates/${id}`, { method: "DELETE" });
    loadPlates();
  };

  const totalProfit = plates.reduce((sum, p) => sum + ((p.feeCharged || 0) - (p.feePaid || 0)), 0);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>📋 Number Plate Registration</h1>
        <button style={styles.btnPrimary} onClick={() => setShowForm(!showForm)}>{showForm ? "✕ Cancel" : "+ Add Record"}</button>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center", border: "1px solid #e2e8f0", borderTop: "4px solid #8b5cf6", maxWidth: 200, marginBottom: 24 }}>
        <div style={{ fontSize: 30, marginBottom: 8 }}>💰</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>{formatPKR(totalProfit)}</div>
        <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase" }}>Total Plate Profit</div>
      </div>

      {showForm && (
        <div style={styles.formCard}>
          <h3 style={styles.formTitle}>New Registration Record</h3>
          <div style={styles.formGrid}>
            {[["Owner Name", "ownerName"], ["CNIC", "cnic"], ["Bike Model", "bikeModel"], ["CC", "cc"], ["Old Plate", "oldPlate"], ["New Plate", "newPlate"]].map(([label, key]) => (
              <div key={key} style={styles.formField}>
                <label style={styles.label}>{label}</label>
                <input type="text" value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={styles.input} placeholder={label} />
              </div>
            ))}
            <div style={styles.formField}>
              <label style={styles.label}>Registration Date</label>
              <input type="date" value={form.registrationDate} onChange={e => setForm({ ...form, registrationDate: e.target.value })} style={styles.input} />
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Fee Charged from Customer (Rs.)</label>
              <input type="number" value={form.feeCharged} onChange={e => setForm({ ...form, feeCharged: e.target.value })} style={styles.input} placeholder="0" />
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Fee Paid to Govt (Rs.)</label>
              <input type="number" value={form.feePaid} onChange={e => setForm({ ...form, feePaid: e.target.value })} style={styles.input} placeholder="0" />
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={styles.input}>
                <option>Pending</option><option>Complete</option>
              </select>
            </div>
            <div style={{ ...styles.formField, gridColumn: "1 / -1" }}>
              <label style={styles.label}>Notes</label>
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ ...styles.input, height: 70, resize: "vertical" }} />
            </div>
          </div>
          {form.feeCharged && form.feePaid && (
            <div style={{ background: "#eff6ff", color: "#1d4ed8", padding: "10px 16px", borderRadius: 8, marginBottom: 14, fontWeight: 600, fontSize: 14 }}>
              Profit: {formatPKR((+form.feeCharged || 0) - (+form.feePaid || 0))}
            </div>
          )}
          <button style={styles.btnPrimary} onClick={savePlate} disabled={saving}>{saving ? "Saving..." : "Save Record"}</button>
        </div>
      )}

      {loading ? <div style={styles.loading}>Loading...</div> :
        plates.length === 0 ? <div style={styles.empty}><div style={{ fontSize: 60 }}>📋</div><p>No records yet.</p></div> :
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <thead>
              <tr style={{ background: "#1e40af" }}>
                {["Owner", "CNIC", "Bike", "Old Plate", "New Plate", "Date", "Charged", "Paid", "Profit", "Status", "Del"].map(h => (
                  <th key={h} style={{ padding: "12px 14px", color: "#fff", fontSize: 12, fontWeight: 600, textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plates.map(p => (
                <tr key={p._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={styles.td}>{p.ownerName || "-"}</td>
                  <td style={styles.td}>{p.cnic || "-"}</td>
                  <td style={styles.td}>{p.bikeModel || "-"}{p.cc ? ` (${p.cc})` : ""}</td>
                  <td style={styles.td}>{p.oldPlate || "-"}</td>
                  <td style={styles.td}>{p.newPlate || "-"}</td>
                  <td style={styles.td}>{formatDate(p.registrationDate || p.createdAt)}</td>
                  <td style={styles.td}>{formatPKR(p.feeCharged)}</td>
                  <td style={styles.td}>{formatPKR(p.feePaid)}</td>
                  <td style={{ ...styles.td, color: "#10b981", fontWeight: 600 }}>{formatPKR((p.feeCharged || 0) - (p.feePaid || 0))}</td>
                  <td style={styles.td}><span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: p.status === "Complete" ? "#dcfce7" : "#fef9c3", color: p.status === "Complete" ? "#166534" : "#854d0e" }}>{p.status}</span></td>
                  <td style={styles.td}><button style={{ background: "#fee2e2", border: "none", borderRadius: 6, padding: "5px 9px", cursor: "pointer" }} onClick={() => deletePlate(p._id)}>🗑️</button></td>
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

  const loadExpenses = () => {
    fetch(`${API}/api/expenses`).then(r => r.json()).then(data => { setExpenses(Array.isArray(data) ? data : []); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { loadExpenses(); }, []);

  const saveExpense = async () => {
    setSaving(true);
    await fetch(`${API}/api/expenses`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false); setForm(emptyForm); setShowForm(false); loadExpenses();
  };

  const deleteExpense = async (id) => {
    if (!window.confirm("Delete?")) return;
    await fetch(`${API}/api/expenses/${id}`, { method: "DELETE" });
    loadExpenses();
  };

  const total = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>💸 Expenses</h1>
        <button style={styles.btnPrimary} onClick={() => setShowForm(!showForm)}>{showForm ? "✕ Cancel" : "+ Add Expense"}</button>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center", border: "1px solid #e2e8f0", borderTop: "4px solid #ef4444", maxWidth: 200, marginBottom: 24 }}>
        <div style={{ fontSize: 30, marginBottom: 8 }}>💸</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>{formatPKR(total)}</div>
        <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase" }}>Total Expenses</div>
      </div>

      {showForm && (
        <div style={styles.formCard}>
          <h3 style={styles.formTitle}>Add Expense</h3>
          <div style={styles.formGrid}>
            <div style={styles.formField}>
              <label style={styles.label}>Title</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={styles.input} placeholder="Expense title" />
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Amount (Rs.)</label>
              <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} style={styles.input} placeholder="0" />
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={styles.input}>
                {["Repair", "Parts", "Transport", "Tools", "Rent", "Utilities", "Other"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Date</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={styles.input} />
            </div>
            <div style={{ ...styles.formField, gridColumn: "1 / -1" }}>
              <label style={styles.label}>Notes</label>
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ ...styles.input, height: 70, resize: "vertical" }} />
            </div>
          </div>
          <button style={styles.btnPrimary} onClick={saveExpense} disabled={saving}>{saving ? "Saving..." : "Save Expense"}</button>
        </div>
      )}

      {loading ? <div style={styles.loading}>Loading...</div> :
        expenses.length === 0 ? <div style={styles.empty}><div style={{ fontSize: 60 }}>💸</div><p>No expenses yet.</p></div> :
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <thead>
              <tr style={{ background: "#1e40af" }}>
                {["Title", "Category", "Amount", "Date", "Notes", "Del"].map(h => (
                  <th key={h} style={{ padding: "12px 14px", color: "#fff", fontSize: 12, fontWeight: 600, textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expenses.map(e => (
                <tr key={e._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={styles.td}>{e.title || "-"}</td>
                  <td style={styles.td}><span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: "#f3f4f6" }}>{e.category}</span></td>
                  <td style={{ ...styles.td, color: "#ef4444", fontWeight: 600 }}>{formatPKR(e.amount)}</td>
                  <td style={styles.td}>{formatDate(e.date || e.createdAt)}</td>
                  <td style={styles.td}>{e.notes || "-"}</td>
                  <td style={styles.td}><button style={{ background: "#fee2e2", border: "none", borderRadius: 6, padding: "5px 9px", cursor: "pointer" }} onClick={() => deleteExpense(e._id)}>🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}

const styles = {
  nav: { background: "#fff", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", position: "sticky", top: 0, zIndex: 100, fontFamily: "'Poppins', sans-serif" },
  navBrand: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 18 },
  brandText: { fontWeight: 700, color: "#1e40af", fontFamily: "'Playfair Display', serif", fontSize: 20 },
  navLinks: { display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" },
  navLink: { padding: "6px 12px", borderRadius: 6, cursor: "pointer", color: "#64748b", fontSize: 13, fontWeight: 500 },
  navLinkActive: { background: "#eff6ff", color: "#1d4ed8" },
  loginBtn: { padding: "7px 16px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 },
  logoutBtn: { padding: "7px 16px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 },
  hero: { background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%)", color: "#fff", padding: "70px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 360, fontFamily: "'Poppins', sans-serif" },
  heroContent: { maxWidth: 580 },
  heroBadge: { background: "rgba(255,255,255,0.15)", display: "inline-block", padding: "5px 14px", borderRadius: 20, fontSize: 13, marginBottom: 14 },
  heroTitle: { fontSize: 48, fontWeight: 800, margin: "0 0 6px 0", fontFamily: "'Playfair Display', serif", letterSpacing: -0.5 },
  heroSubtitle: { fontSize: 20, opacity: 0.85, margin: "0 0 14px 0", fontWeight: 300 },
  heroDesc: { fontSize: 15, opacity: 0.8, lineHeight: 1.7, margin: "0 0 28px 0" },
  heroButtons: { display: "flex", gap: 14 },
  section: { padding: "56px 48px", fontFamily: "'Poppins', sans-serif" },
  sectionTitle: { fontSize: 28, fontWeight: 700, color: "#1e293b", marginBottom: 36, textAlign: "center", fontFamily: "'Playfair Display', serif" },
  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 },
  serviceCard: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24, textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
  loginContainer: { minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", fontFamily: "'Poppins', sans-serif" },
  loginCard: { background: "#fff", borderRadius: 16, padding: 44, width: 360, boxShadow: "0 4px 24px rgba(0,0,0,0.1)", textAlign: "center" },
  pageContainer: { padding: "28px 40px", fontFamily: "'Poppins', sans-serif", maxWidth: 1400, margin: "0 auto" },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 },
  pageTitle: { fontSize: 26, fontWeight: 700, color: "#1e293b", margin: 0, fontFamily: "'Playfair Display', serif" },
  formCard: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24, marginBottom: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
  formTitle: { fontSize: 17, fontWeight: 600, color: "#1e293b", marginBottom: 18, marginTop: 0 },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 14 },
  formField: { display: "flex", flexDirection: "column", gap: 5 },
  label: { fontSize: 12, fontWeight: 500, color: "#374151" },
  input: { padding: "9px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 13, color: "#1e293b", outline: "none", fontFamily: "'Poppins', sans-serif" },
  td: { padding: "11px 14px", fontSize: 13, color: "#374151", whiteSpace: "nowrap" },
  btnPrimary: { padding: "9px 22px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13, fontFamily: "'Poppins', sans-serif" },
  btnOutline: { padding: "9px 22px", background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 },
  loading: { textAlign: "center", padding: 60, color: "#64748b", fontSize: 15 },
  empty: { textAlign: "center", padding: 60, color: "#94a3b8" },
};

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
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Poppins', sans-serif" }}>
      <Navbar page={page} setPage={setPage} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      {renderPage()}
    </div>
  );
}
