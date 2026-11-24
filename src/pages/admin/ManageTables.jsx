
import { useState } from "react";
import { tableData } from "../../data/tableData";

function ManageTables() {
  const [tables, setTables] = useState(() =>
    JSON.parse(localStorage.getItem("tables") || "null") || tableData
  );

  function save(updated) {
    setTables(updated);
    localStorage.setItem("tables", JSON.stringify(updated));
  }

  function addTable() {
    const table = {
      id: Date.now(),
      name: `Table ${tables.length + 1}`,
      category: "Regular",
      seats: 2,
      price: 100
    };
    save([...tables, table]);
  }

  return (
    <div>
      <h1>Manage Tables</h1>
      <button onClick={addTable}>Add Table</button>

      {tables.map((t) => (
        <div className="card" key={t.id}>
          <h3>{t.name}</h3>
          <p>{t.category} | {t.seats} seats | ₹{t.price}</p>
          <button onClick={() => save(tables.filter((x) => x.id !== t.id))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ManageTables;
