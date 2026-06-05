import React, { useEffect, useState } from "react";

export default function App() {
const [bikes, setBikes] = useState([]);
const [name, setName] = useState("");
const [cost, setCost] = useState("");
const [sale, setSale] = useState("");

useEffect(() => {
fetch("http://localhost:5000/api/bikes")
.then(res => res.json())
.then(data => setBikes(data));
}, []);

function addBike() {
const profit = Number(sale) - Number(cost);

const bike = { name, cost, sale, profit };

fetch("http://localhost:5000/api/bikes", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(bike)
})
.then(res => res.json())
.then(() => {
setBikes(prev => [bike, ...prev]);
})
.catch(err => console.log(err));

setName("");
setCost("");
setSale("");
}

function deleteBike(id) {
fetch(`http://localhost:5000/api/bikes/${id}`, {
method: "DELETE"
}).then(() => {
setBikes(prev => prev.filter(b => b._id !== id));
});
}

return (
<div style={{ padding: 20 }}> <h2>Bike Hub</h2>

```
  <input
    placeholder="Name"
    value={name}
    onChange={e => setName(e.target.value)}
  />
  <input
    placeholder="Cost"
    value={cost}
    onChange={e => setCost(e.target.value)}
  />
  <input
    placeholder="Sale"
    value={sale}
    onChange={e => setSale(e.target.value)}
  />

<button onClick={addBike}>Add</button>

  {bikes.map((b) => (
    <div key={b._id} style={{ marginTop: 10 }}>
      <h4>{b.name}</h4>
      <p>Cost: {b.cost}</p>
      <p>Sale: {b.sale}</p>
      <p style={{ color: b.profit >= 0 ? "green" : "red" }}>
        {b.profit >= 0 ? "Munafa" : "Nuqsan"}: {b.profit}
      </p>
      <button onClick={() => deleteBike(b._id)}>Delete</button>
     </div>
  ))}
</div>

);
}