
import { useNavigate } from "react-router-dom";
import { tableData } from "../data/tableData";

function SelectTable() {
  const navigate = useNavigate();
  const category = localStorage.getItem("category") || "Regular";

  const tables = tableData.filter((t) => t.category === category);

  function chooseTable(table) {
    localStorage.setItem("selectedTable", JSON.stringify(table));
    navigate("/confirmation");
  }

  return (
    <div>
      <h1>Available Tables</h1>
      {tables.map((table) => (
        <div className="card" key={table.id}>
          <h3>{table.name}</h3>
          <p>Seats: {table.seats}</p>
          <p>Price: ₹{table.price}</p>
          <button onClick={() => chooseTable(table)}>Select Table</button>
        </div>
      ))}
    </div>
  );
}

export default SelectTable;
