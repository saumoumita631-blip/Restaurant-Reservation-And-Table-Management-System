
function TodayReservations() {
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  const today = new Date().toLocaleDateString("en-CA");
  const todayBookings = bookings.filter((b) => b.date === today);

  return (
    <div>
      <h1>Today's Reservations</h1>
      {todayBookings.length === 0 && <p>No reservations for today.</p>}
      {todayBookings.map((b) => (
        <div className="card" key={b.id}>
          <p>{b.email} — {b.time}</p>
          <p>{b.table.name} — {b.status}</p>
        </div>
      ))}
    </div>
  );
}

export default TodayReservations;
