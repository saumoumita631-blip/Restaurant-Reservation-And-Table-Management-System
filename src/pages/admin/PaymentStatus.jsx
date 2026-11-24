
import { useState } from "react";

function PaymentStatus() {
  const [bookings, setBookings] = useState(() =>
    JSON.parse(localStorage.getItem("bookings") || "[]")
  );

  function togglePayment(id) {
    const updated = bookings.map((b) =>
      b.id === id
        ? { ...b, payment: b.payment === "Paid" ? "Pending" : "Paid" }
        : b
    );
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  }

  return (
    <div>
      <h1>Payment Status</h1>
      {bookings.map((b) => (
        <div className="card" key={b.id}>
          <p>Booking #{b.id}</p>
          <p>Payment: {b.payment || "Pending"}</p>
          <button onClick={() => togglePayment(b.id)}>
            Toggle Paid / Pending
          </button>
        </div>
      ))}
    </div>
  );
}

export default PaymentStatus;
