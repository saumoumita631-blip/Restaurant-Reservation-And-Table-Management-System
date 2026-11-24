
function BookingHistory() {
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  return (
    <div>
      <h1>Booking History</h1>
      {bookings.length === 0 && <p>No booking history available.</p>}
      {bookings.map((b) => (
        <div className="card" key={b.id}>
          <h3>Booking #{b.id}</h3>
          <p>Customer: {b.email}</p>
          <p>Date: {b.date} | Time: {b.time}</p>
          <p>Table: {b.table.name}</p>
          <p>Status: {b.status}</p>
        </div>
      ))}
    </div>
  );
}

export default BookingHistory;
