
function TableCard({ table, onSelect }) {
  return (
    <div className="card">
      <h3>{table.name}</h3>
      <p>Category: {table.category}</p>
      <p>Seats: {table.seats}</p>
      <p>Price: ₹{table.price}</p>
      <button onClick={() => onSelect(table)}>Select Table</button>
    </div>
  );
}

export default TableCard;
