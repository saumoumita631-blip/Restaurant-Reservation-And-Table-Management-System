
function MyBookings() {
  const email = localStorage.getItem("email");
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    .filter((b) => b.email === email);

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length === 0 && <p>No bookings found.</p>}

      {bookings.map((b) => (
        <div className="card" key={b.id}>
          <h3>Booking #{b.id}</h3>
          <p>Date: {b.date} | Time: {b.time}</p>
          <p>Table: {b.table.name}</p>
          <p>Guests: {b.guests}</p>
          <p>Status: {b.status}</p>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
