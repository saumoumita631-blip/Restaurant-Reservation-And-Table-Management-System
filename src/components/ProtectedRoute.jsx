
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  // User must be logged in
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Customer cannot access admin pages
  if (allowedRole === "admin" && user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  // Admin cannot access customer pages
  if (allowedRole === "customer" && user.role !== "customer") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default ProtectedRoute;
