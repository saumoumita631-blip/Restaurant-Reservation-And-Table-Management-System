
import { Link } from "react-router-dom";

function Dashboard() {
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="card">
        <h3>Total Reservations: {bookings.length}</h3>
      </div>
      <Link to="/admin/today"><button>Today's Reservations</button></Link>
      <Link to="/admin/tables"><button>Manage Tables</button></Link>
      <Link to="/admin/history"><button>Booking History</button></Link>
    </div>
  );
}

export default Dashboard;
