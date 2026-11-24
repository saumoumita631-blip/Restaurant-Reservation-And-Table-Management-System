
import { Link } from "react-router-dom";

function BookingConfirmation() {
  function confirm() {
    const table = JSON.parse(localStorage.getItem("selectedTable") || "null");

    if (!table) {
      alert("Please select a table first.");
      return;
    }

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    const booking = {
      id: Date.now(),
      email: localStorage.getItem("email"),
      date: localStorage.getItem("bookingDate"),
      time: localStorage.getItem("bookingTime"),
      guests: localStorage.getItem("guests"),
      table,
      status: "Confirmed"
    };

    localStorage.setItem("bookings", JSON.stringify([...bookings, booking]));
    alert("Booking confirmed successfully!");
  }

  return (
    <div className="card">
      <h1>Booking Confirmation</h1>
      <p>Date: {localStorage.getItem("bookingDate")}</p>
      <p>Time: {localStorage.getItem("bookingTime")}</p>
      <p>Category: {localStorage.getItem("category")}</p>
      <p>Guests: {localStorage.getItem("guests")}</p>
      <button onClick={confirm}>Confirm Booking</button>
      <Link to="/my-bookings"><button>My Bookings</button></Link>
    </div>
  );
}

export default BookingConfirmation;
