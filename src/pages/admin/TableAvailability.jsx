
import { tableData } from "../../data/tableData";

function TableAvailability() {
  const tables = JSON.parse(localStorage.getItem("tables") || "null") || tableData;

  return (
    <div>
      <h1>Table Availability</h1>
      {tables.map((t) => (
        <div className="card" key={t.id}>
          <h3>{t.name}</h3>
          <p>Category: {t.category}</p>
          <p>Seats: {t.seats}</p>
        </div>
      ))}
    </div>
  );
}

export default TableAvailability;
