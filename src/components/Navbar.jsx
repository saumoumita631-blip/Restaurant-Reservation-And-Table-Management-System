
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const [showProfile, setShowProfile] = useState(false);

  // Update user information after login or logout
  useEffect(() => {
    const updateUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user") || "null"));
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("authChanged", updateUser);

    return () => {
      window.removeEventListener("authChanged", updateUser);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setShowProfile(false);

    window.dispatchEvent(new Event("authChanged"));

    alert("Logged out successfully!");
    navigate("/");
  };

  // Get first letter of user's name
  const initial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  return (
    <nav className="navbar">
      <h2>TableEase</h2>

      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/restaurant">Restaurant</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/booking">Book Table</Link>
        <Link to="/my-bookings">My Bookings</Link>

        {/* Show Admin before login and for admin users */}
        {(!user || user.role === "admin") && (
          <Link to="/admin/login">Admin</Link>
        )}

        {/* Profile icon for logged-in users */}
        {user && (
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginLeft: "15px",
            }}
          >
            <button
              type="button"
              onClick={() => setShowProfile(!showProfile)}
              aria-label="Open profile menu"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: "#174b38",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
              }}
            >
              {initial}
            </button>

            {/* Profile dropdown */}
            {showProfile && (
              <div
                style={{
                  position: "absolute",
                  top: "52px",
                  right: "0",
                  width: "230px",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "18px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  zIndex: 1000,
                  color: "#333",
                }}
              >
                <div
                  style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    backgroundColor: "#174b38",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "25px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                  }}
                >
                  {initial}
                </div>

                <h3 style={{ margin: "5px 0" }}>
                  {user.name || "User"}
                </h3>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#666",
                    overflowWrap: "anywhere",
                    margin: "5px 0",
                  }}
                >
                  {user.email}
                </p>

                <p
                  style={{
                    fontSize: "12px",
                    color: "#174b38",
                    textTransform: "capitalize",
                  }}
                >
                  {user.role}
                </p>

                <hr />

                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#174b38",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
