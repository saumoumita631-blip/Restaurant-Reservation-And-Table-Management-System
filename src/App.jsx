
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CustomerLogin from "./pages/customer/Login";
import AdminLogin from "./pages/admin/Login";
import Signup from "./pages/customer/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";
import Menu from "./pages/Menu";
import Booking from "./pages/Booking";
import TableCategory from "./pages/TableCategory";
import SelectTable from "./pages/SelectTable";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";

import Dashboard from "./pages/admin/Dashboard";
import ManageTables from "./pages/admin/ManageTables";
import TodayReservations from "./pages/admin/TodayReservations";
import BookingHistory from "./pages/admin/BookingHistory";

import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<CustomerLogin />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/restaurant" element={<RestaurantDetails />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/category" element={<TableCategory />} />
          <Route path="/tables" element={<SelectTable />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
          <Route path="/my-bookings" element={<MyBookings />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/tables" element={<ManageTables />} />
          <Route path="/admin/today" element={<TodayReservations />} />
          <Route path="/admin/history" element={<BookingHistory />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
