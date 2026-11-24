
import { Link } from "react-router-dom";

function AdminLogin() {
  return (
    <div className="card">
      <h1>Admin Login</h1>
      <p>For this demo, sign in using admin@gmail.com on the main login page.</p>
      <Link to="/"><button>Go to Login</button></Link>
    </div>
  );
}

export default AdminLogin;
