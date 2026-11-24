
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Booking() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState(2);
  const navigate = useNavigate();

  function next(e) {
    e.preventDefault();
    localStorage.setItem("bookingDate", date);
    localStorage.setItem("bookingTime", time);
    localStorage.setItem("guests", guests);
    navigate("/category");
  }

  return (
    <div className="card">
      <h1>Book a Table</h1>
      <form onSubmit={next}>
        <label>Date</label>
        <input
          type="date"
          min={new Date().toLocaleDateString("en-CA")}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Time</label>
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="12:00">12:00 PM</option>
          <option value="14:00">2:00 PM</option>
          <option value="18:00">6:00 PM</option>
          <option value="19:00">7:00 PM</option>
          <option value="20:00">8:00 PM</option>
        </select>

        <label>Number of guests</label>
        <select value={guests} onChange={(e) => setGuests(e.target.value)}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default Booking;
